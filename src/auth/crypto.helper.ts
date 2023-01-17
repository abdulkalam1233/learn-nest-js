import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoHelper {
  async hashPassword(plainPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(plainPassword, salt);
  }

  async comparePasswords(
    hashedPassword: string,
    plainPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
