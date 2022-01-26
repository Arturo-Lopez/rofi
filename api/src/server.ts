import fastify, { FastifyInstance, FastifyReply, FastifyRequest, FastifyServerOptions } from 'fastify';
import mercurius from 'mercurius';
import AltairFastify from 'altair-fastify-plugin';
import mercuriusUpload from 'mercurius-upload';
import fastifyCookie from 'fastify-cookie';

import shutdownPlugin from './plugins/shutdown';
import statusPlugin from './plugins/status';
import prismaPlugin from './plugins/prisma';
import sessionPlugin from './plugins/session';

import { Context } from './types/Context';
import { schema } from './rootSchema';

export function createServer(opts: FastifyServerOptions = {}): FastifyInstance {
  const server = fastify(opts);

  server.register(statusPlugin);

  server.register(fastifyCookie);
  server.register(sessionPlugin);
  server.register(prismaPlugin);
  server.register(mercuriusUpload);
  server.register(shutdownPlugin);

  server.register(mercurius, {
    schema,
    path: '/graphql',
    graphiql: false,
    context: (request: FastifyRequest, reply: FastifyReply): Context => ({
      db: server.db,
      request,
      reply,
    }),
  });

  server.register(AltairFastify, {
    path: '/altair',
    baseURL: '/altair/',
    endpointURL: '/graphql',
    initialSettings: {
      theme: 'dark',
      'plugin.list': ['altair-graphql-plugin-graphql-explorer'],
    },
  });

  return server;
}

export async function startServer() {
  const server = createServer({
    logger: {
      level: 'info',
      prettyPrint: process.env.NODE_ENV === 'development',
    },
    disableRequestLogging: process.env.ENABLE_REQUEST_LOGGING !== 'true',
  });

  try {
    const port = process.env.PORT ?? 4000;
    await server.listen(port, '0.0.0.0');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}
