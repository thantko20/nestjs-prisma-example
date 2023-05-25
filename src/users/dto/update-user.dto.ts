import { CreateUserDto } from './create-user.dto';

export type UpdateUserDto = Pick<CreateUserDto, 'name'>;
