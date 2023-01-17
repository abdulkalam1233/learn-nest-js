import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninResponseDTO } from './dto/signin-response.dto';
import { SingInDTO } from './dto/signin.dto';
import { SignupDTO } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() singupDto: SignupDTO): Promise<void> {
    return this.authService.createUser(singupDto);
  }

  @Post('/signin')
  async login(@Body() signinCreds: SingInDTO): Promise<SigninResponseDTO> {
    return this.authService.signinUser(signinCreds);
  }
}
