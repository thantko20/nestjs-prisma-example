import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utilsService: UtilsService,
  ) {}

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

    return await this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map((user) =>
      this.utilsService.excludeFields(user, ['password']),
    );
  }

  async findUserById(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }
}
