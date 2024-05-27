import { Static, Type } from '@sinclair/typebox';

export const UserTB = Type.Object({
  first_name: Type.String(),
  last_name: Type.String(),
  email: Type.String({ format: 'email' }),
});

export type UserType = Static<typeof UserTB>;
