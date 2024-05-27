import fp from 'fastify-plugin';

export default fp(async (fastify) => {
  fastify.register(import('@fastify/swagger'), {
    openapi: {
      openapi: '3.0.0',
    },
  });
  fastify.register(import('@fastify/swagger-ui'), {
    prefix: '/docs',
  });
});
