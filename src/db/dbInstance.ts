import dotenv from 'dotenv';
import { type DB } from './types/db_types'; // this is the Database interface we defined earlier
import pg from 'pg';
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';

dotenv.config();

const { Pool } = pg;

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
});

export const dbInstance = new Kysely<DB>({
  dialect,
  plugins: [new CamelCasePlugin()],
});
