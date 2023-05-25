import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersUtilsService } from './usersUtils.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersUtilsService: UsersUtilsService,
  ) {}

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map(this.usersUtilsService.userWithoutSensitiveFields);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const user = await this.usersService.findUserById(id);

    return this.usersUtilsService.userWithoutSensitiveFields(user);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.updateUser(id, updateUserDto);

    return this.usersUtilsService.userWithoutSensitiveFields(user);
  }
}
