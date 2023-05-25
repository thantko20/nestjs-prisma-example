import { Prisma } from '@prisma/client';

export type CreateUserDto = Pick<Prisma.UserCreateInput, 'email' | 'name'>;
