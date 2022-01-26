import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { PrismaClient } from '@prisma/client';

declare module 'fastify' {
  interface FastifyInstance {
    db: PrismaClient;
  }
}

const prismaPlugin: FastifyPluginAsync = fp(async (server) => {
  const prisma = new PrismaClient({
    log: ['error', 'warn'],
  });

  await prisma.$connect();

  server.decorate('db', prisma);

  server.addHook('onClose', async (serverOnClose) => {
    serverOnClose.log.info('disconnecting Prisma from DB');
    await serverOnClose.db.$disconnect();
  });
});

export default prismaPlugin;
