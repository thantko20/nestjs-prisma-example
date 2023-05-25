import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class UsersUtilsService {
  constructor(private readonly utilsService: UtilsService) {}

  userWithoutSensitiveFields(user: User) {
    return this.utilsService.excludeFields(user, ['password']);
  }
}
