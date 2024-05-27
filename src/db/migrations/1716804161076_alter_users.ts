import { Kysely } from 'kysely';
import { DB } from '../types/db_types';

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .alterTable('users')
    .addUniqueConstraint('users_email_unique', ['email'])
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema
    .alterTable('users')
    .dropConstraint('users_email_unique')
    .execute();
}
