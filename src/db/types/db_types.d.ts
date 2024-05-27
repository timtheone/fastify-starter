import type { ColumnType } from 'kysely';

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;

export interface Users {
  email: string;
  firstName: string;
  id: Generated<string>;
  lastName: string;
}

export interface DB {
  users: Users;
}
