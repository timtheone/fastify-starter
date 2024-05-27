import dotenv from 'dotenv';

dotenv.config();
import AutoLoad from '@fastify/autoload';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import * as path from 'path';
import Fastify from 'fastify';
import closeWithGrace from 'close-with-grace';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const environment = process.env.NODE_ENV ? 'production' : 'development';

const envToLogger = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
  test: false,
};

const app = Fastify({
  logger: envToLogger[environment] ?? true,
}).withTypeProvider<TypeBoxTypeProvider>();

app.register(AutoLoad, {
  dir: join(__dirname, 'plugins'),
  forceESM: true,
});
app.register(AutoLoad, {
  dir: path.join(__dirname, 'routes'),
  forceESM: true,
  options: { prefix: '/api' },
});

app.listen({
  port: process.env.PORT || 3000,
  host: process.env.HOST || '0.0.0.0',
});

closeWithGrace(async ({ err }) => {
  if (err) {
    app.log.error({ err }, 'server closing due to error');
  } else {
    app.log.info('shutting down gracefully');
  }
  await app.close();
});
