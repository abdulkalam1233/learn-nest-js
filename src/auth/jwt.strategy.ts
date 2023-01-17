import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      secretOrKey: 'secret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JWTPayload) {
    const user = await this.userRepository.findBy({
      username: payload.username,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
