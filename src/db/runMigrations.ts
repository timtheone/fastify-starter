import dotenv from 'dotenv';
import * as path from 'path';
import pg from 'pg';
import { dirname } from 'path';

import { promises as fs } from 'fs';
import {
  Kysely,
  Migrator,
  PostgresDialect,
  FileMigrationProvider,
  MigrationResult,
} from 'kysely';
import { fileURLToPath } from 'url';
import { DB } from './types/db_types';

dotenv.config();

const { Pool } = pg;

function setup() {
  const db = new Kysely<DB>({
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString: process.env.DATABASE_URL,
      }),
    }),
  });

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      // This needs to be an absolute path.
      migrationFolder: path.join(
        dirname(fileURLToPath(import.meta.url)),
        './migrations',
      ),
    }),
  });

  return { db, migrator };
}

function migrate(
  results: MigrationResult[] | undefined,
  error: unknown,
  type: 'up' | 'down',
) {
  results?.forEach((it) => {
    console.log(it.status);
    if (it.status === 'Success') {
      console.log(
        type == 'down'
          ? `migration "${it.migrationName}" was rolled back successfully`
          : `migration "${it.migrationName}" was executed successfully`,
      );
    } else if (it.status === 'Error') {
      console.error(
        type == 'down'
          ? `failed to roll back migration "${it.migrationName}"`
          : `failed to execute migration "${it.migrationName}"`,
      );
    }
  });

  if (error) {
    console.error(type == 'down' ? 'failed to rollback' : 'failed to migrate');
    console.error(error);
    process.exit(1);
  }
}

async function migrateToLatest() {
  const { db, migrator } = setup();
  const { error, results } = await migrator.migrateToLatest();

  if (results?.length == 0) {
    console.log('Database is already up to date.');
  }

  migrate(results, error, 'up');

  await db.destroy();
}

async function rollback() {
  const { db, migrator } = setup();
  const { error, results } = await migrator.migrateDown();

  migrate(results, error, 'down');

  await db.destroy();
}

if (process.argv[2] == 'down') {
  console.log('Rolling back migrations...');
  rollback();
} else {
  console.log('Migrating to the latest version...');
  migrateToLatest();
}
