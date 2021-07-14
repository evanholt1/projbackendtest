// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { UserService } from 'src/user/user.service';
// import { SignUpUserDto } from './dto/user-signup.dto';
// import { CreateUserDto } from 'src/user/dto/create-user.dto';
// import { User } from 'src/user/schemas/user.schema';
// import { Role } from 'src/utils/enums/role.enum';
// @Injectable()
// export class AuthService {
//   constructor(
//     private userService: UserService,
//     private jwtService: JwtService,
//   ) {}
//   async signUpUser(signUpUserDto: CreateUserDto) {
//     let user: User;
//     user = await this.userService.findOneByUUID(signUpUserDto.uuid);
//     if (!user) {
//       // const createUserDto = new CreateUserDto({
//       //   name: signUpUserDto.name,
//       //   uuid: signUpUserDto.uuid,
//       //   email: signUpUserDto.email,
//       //   phone_number: signUpUserDto.phone_number,
//       //   email: signUpUserDto.email,
//       //   role: Role.User, // default role is user role
//       // });
//       user = await this.userService.create(signUpUserDto);
//     }
//     const payload = { sub: user._id, role: user.role }; // "sub" due to jwt standard name
//     const jwt = await this.jwtService.signAsync(payload);
//     return {
//       token: jwt,
//       userId: user._id,
//     };
//   }
// }
