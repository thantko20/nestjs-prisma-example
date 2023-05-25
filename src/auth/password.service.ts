import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { BcryptConstants } from './constants';

@Injectable()
export class PasswordService {
  async encryptPassword(password: string) {
    return await bcrypt.hash(password, BcryptConstants.saltRounds);
  }

  async comparePasswords(encryptedPassword: string, plainPassword: string) {
    return await bcrypt.compare(plainPassword, encryptedPassword);
  }
}
