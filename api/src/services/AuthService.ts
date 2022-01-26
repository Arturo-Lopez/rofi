import mercurius from 'mercurius';
import { AuthProvider, PrismaClient } from '@prisma/client';

import { Context } from '../types/Context';
import { genPasswordHash, isValidPassword } from '../lib/passwordEncryption';
import { getGoogleToken } from '../lib/googleAuth';

const { ErrorWithProps } = mercurius;

interface EmailCredentials {
  email: string;
  password: string;
}

interface SignUpEmailData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface SocialProviderCredentials {
  provider: AuthProvider;
  providerId: string;
}

interface SocialProviderData {
  firstName: string;
  lastName: string;
  email: string;
  provider: AuthProvider;
  providerId: string;
}

interface SessionData {
  userId: bigint;
  email: string;
}

export class AuthService {
  ctx: Context;

  db: PrismaClient;

  constructor(ctx: Context) {
    this.ctx = ctx;
    this.db = ctx.db;
  }

  createSession(data: SessionData) {
    this.ctx.request.session.userId = data.userId.toString();
    this.ctx.request.session.email = data.email;
  }

  async destroySession() {
    return new Promise((resolve) => {
      this.ctx.request.destroySession((err) => {
        if (err) throw new ErrorWithProps('session destroy unsuccessful', undefined, 500);
        resolve(undefined);
      });
    });
  }

  async signUp(data: SignUpEmailData) {
    const { hashedPassword, salt } = await genPasswordHash(data.password);

    const user = await this.db.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (user) {
      throw new ErrorWithProps('email already in use', undefined, 400);
    }

    const newUser = await this.db.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
        passswordSalt: salt,
      },
    });

    this.createSession({
      userId: newUser.id,
      email: newUser.email,
    });

    return newUser;
  }

  async signIn(data: EmailCredentials) {
    const user = await this.db.user.findFirst({
      where: {
        email: data.email,
        password: {
          not: null,
        },
        passswordSalt: {
          not: null,
        },
      },
    });

    if (!user || !user.password || !user.passswordSalt) {
      throw new ErrorWithProps('user not found', undefined, 400);
    }

    const isValid = await isValidPassword({
      password: data.password,
      hashedPassword: user.password,
      salt: user.passswordSalt,
    });

    if (!isValid) {
      throw new ErrorWithProps('invalid password', undefined, 400);
    }

    this.createSession({
      userId: user.id,
      email: user.email,
    });

    return user;
  }

  async signInWithProvider(data: SocialProviderCredentials) {
    const user = await this.db.account
      .findFirst({
        where: {
          provider: data.provider,
          providerId: data.providerId,
        },
      })
      .user();

    if (!user) {
      throw new ErrorWithProps('user not found', undefined, 400);
    }

    this.createSession({
      userId: user.id,
      email: user.email,
    });

    return user;
  }

  async signUpFromProvider(data: SocialProviderData) {
    const user = await this.db.user.findFirst({
      where: {
        email: data.email,
        accounts: {
          some: {
            provider: data.provider,
          },
        },
      },
    });

    if (user) {
      throw new ErrorWithProps('provider already applied', undefined, 400);
    }

    const newUser = await this.db.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        accounts: {
          create: {
            provider: data.provider,
            providerId: data.providerId,
          },
        },
      },
    });

    this.createSession({
      userId: newUser.id,
      email: newUser.email,
    });

    return newUser;
  }

  async signInWithGoogle(idToken: string) {
    const data = await getGoogleToken(idToken);

    return this.signInWithProvider({
      provider: 'GOOGLE',
      providerId: data.sub,
    });
  }

  async signUpWithGoogle(idToken: string) {
    const data = await getGoogleToken(idToken);

    return this.signUpFromProvider({
      email: data.email,
      provider: 'GOOGLE',
      providerId: data.sub,
      firstName: data.given_name || '',
      lastName: data.family_name || '',
    });
  }
}
