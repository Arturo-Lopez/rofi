import { FastifyPluginAsync } from 'fastify';
import fastifySession from '@fastify/session';

declare module 'fastify' {
  interface Session {
    userId: string;
    email: string;
    id?: number;
  }
}

const sessionPlugin: FastifyPluginAsync = async (server) => {
  server.register(fastifySession, {
    secret: process.env.SESSION_TOKEN_SECRET,
    saveUninitialized: false,
    cookie: {
      sameSite: 'lax',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    },
  });
};

export default sessionPlugin;
