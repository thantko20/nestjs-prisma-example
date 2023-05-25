import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersUtilsService } from './usersUtils.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersUtilsService],
  exports: [UsersService, UsersUtilsService],
})
export class UsersModule {}
