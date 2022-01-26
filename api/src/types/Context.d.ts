import { PrismaClient } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';

export interface Context {
  db: PrismaClient;
  request: FastifyRequest;
  reply: FastifyReply;
}
