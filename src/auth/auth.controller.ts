import { Body, Controller, Post, Request } from '@nestjs/common';
import { Public } from 'src/utils/decorators/public-route.decorator';
import { AuthService } from './auth.service';
import { SignUpUserDto } from './dto/user-signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/signup')
  signUp(@Body() signUpUserDto: SignUpUserDto) {
    return this.authService.signUpUser(signUpUserDto);
  }
}
