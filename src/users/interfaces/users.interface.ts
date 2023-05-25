import { Prisma } from '@prisma/client';

export type User = Prisma.UserGetPayload<unknown>;

export type UserWithPosts = User &
  Prisma.UserGetPayload<{
    include: {
      posts: true;
    };
  }>;
