import { Prisma } from '@prisma/client';

export type CreatePostDto = Pick<
  Prisma.PostCreateInput,
  'title' | 'author' | 'content'
>;
