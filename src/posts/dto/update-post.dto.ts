import { CreatePostDto } from './create-post.dto';

export type UpdatePostDto = Pick<CreatePostDto, 'content' | 'title'>;
