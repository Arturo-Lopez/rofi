import mercurius from 'mercurius';
import { OAuth2Client, TokenPayload } from 'google-auth-library';

const { ErrorWithProps } = mercurius;
const client = new OAuth2Client(process.env.GOOGLE_ID);

export interface GoogleTokenPayload extends TokenPayload {
  email: string;
}

export const getGoogleToken = async (idToken: string) => {
  let data: TokenPayload | undefined;

  try {
    const ticket = await client.verifyIdToken({
      idToken,
    });

    data = ticket.getPayload();

    if (!data || !data.email) throw new ErrorWithProps('invalid token', undefined, 400);
  } catch (err) {
    throw new ErrorWithProps('invalid token', undefined, 400);
  }

  return data as GoogleTokenPayload;
};
