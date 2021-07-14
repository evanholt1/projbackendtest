// import { Body, Controller, Post, Request, Res } from '@nestjs/common';
// import { CreateUserDto } from 'src/user/dto/create-user.dto';
// import { Public } from 'src/utils/decorators/public-route.decorator';
// import { AuthService } from './auth.service';
// import { SignUpUserDto } from './dto/user-signup.dto';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Public()
//   @Post('/signup')
//   signUp(@Body() signUpUserDto: CreateUserDto) {
//     return this.authService.signUpUser(create);
//   }
// }
