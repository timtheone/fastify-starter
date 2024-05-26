import fp from 'fastify-plugin';

export default fp(async (fastify) => {
  fastify.register(import('@fastify/swagger'));
  fastify.register(import('@fastify/swagger-ui'), {
    prefix: '/docs',
  });
});
