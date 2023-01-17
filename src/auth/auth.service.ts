import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CryptoHelper } from './crypto.helper';
import { SigninResponseDTO } from './dto/signin-response.dto';
import { SingInDTO } from './dto/signin.dto';
import { SignupDTO } from './dto/signup.dto';
import { JWTPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private cryptoHelper: CryptoHelper,
    private jwtService: JwtService,
  ) {}

  async createUser(singupDto: SignupDTO) {
    const { username, password } = singupDto;
    const hasedPassword = await this.cryptoHelper.hashPassword(password);
    const user = this.userRepository.create({
      username,
      password: hasedPassword,
    });

    try {
      await this.userRepository.save(user);
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('User name already exists');
      }
      throw InternalServerErrorException;
    }
  }

  async signinUser(signinCreds: SingInDTO): Promise<SigninResponseDTO> {
    const { username, password } = signinCreds;
    const user = await this.userRepository.findOneBy({ username });
    if (
      user &&
      (await this.cryptoHelper.comparePasswords(user.password, password))
    ) {
      const payload: JWTPayload = {
        username: user.username,
      };
      return {
        accessToken: this.jwtService.sign(payload),
      };
    }
    throw new UnauthorizedException('Invalid username or password');
  }
}
