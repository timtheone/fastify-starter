import { FastifyPluginAsync } from 'fastify';

import { dbInstance } from '../../db/dbInstance';
import { UserType } from '../../types/Users';
const users: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.post<{ Body: UserType }>(
    '/',
    {
      schema: {
        tags: ['users'],
        description: 'Create a user',
        body: {
          type: 'object',
          required: ['first_name', 'last_name', 'email'],
          properties: {
            first_name: { type: 'string' },
            last_name: { type: 'string' },
            email: { type: 'string' },
          },
        },
        response: {
          201: {
            type: 'string',
          },
        },
      },
    },
    async function (request, reply) {
      const { first_name, last_name, email } = request.body;
      await dbInstance
        .insertInto('users')
        .values({
          firstName: first_name,
          lastName: last_name,
          email,
        })
        .executeTakeFirst();

      reply.code(201).send('User created successfully!');
    },
  );
};

export default users;
