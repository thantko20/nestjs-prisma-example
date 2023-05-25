import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilsService } from 'src/utils/utils.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utilsService: UtilsService,
  ) {}

  private userWithoutSensitiveInfo(user: User) {
    return this.utilsService.excludeFields(user, ['password']);
  }

  async create(createUserDto: CreateUserDto) {
    const { email, name } = createUserDto;
    if (!email || !name) {
      throw new BadRequestException();
    }

    const existingUserWithEmail = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUserWithEmail) {
      throw new BadRequestException('USER_WITH_EMAIL_ALREADY_EXISTS');
    }

    const user = await this.prisma.user.create({
      data: createUserDto,
    });
    return this.userWithoutSensitiveInfo(user);
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map(this.userWithoutSensitiveInfo);
  }

  async findUserById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    return this.userWithoutSensitiveInfo(user);
  }

  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return this.userWithoutSensitiveInfo(user);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findUserById(id);

    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    return this.userWithoutSensitiveInfo(updatedUser);
  }
}
