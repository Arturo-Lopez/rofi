import { FastifyPluginAsync } from 'fastify';

const statusPlugin: FastifyPluginAsync = async (server) => {
  // Status/health endpoint
  server.get(`/`, async () => ({ up: true }));
};

export default statusPlugin;
