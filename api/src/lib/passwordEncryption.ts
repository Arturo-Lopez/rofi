import argon2 from 'argon2';
import crypto from 'crypto';

export const genPasswordHash = async (password: string) => {
  // Generates 32 caracters length salt
  const salt = crypto.randomBytes(16).toString('hex');

  const hashedPassword = await argon2.hash(password, {
    salt: Buffer.from(salt),
    version: argon2.argon2id,
  });

  return {
    hashedPassword,
    salt,
  };
};

interface IsValidPasswordArgs {
  password: string;
  hashedPassword: string;
  salt: string;
}

export const isValidPassword = async ({ password, hashedPassword, salt }: IsValidPasswordArgs): Promise<boolean> =>
  argon2.verify(hashedPassword, password, {
    salt: Buffer.from(salt),
  });
