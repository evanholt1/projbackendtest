import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { SignUpUserDto } from './dto/user-signup.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/schemas/user.schema';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signUpUser(signUpUserDto: SignUpUserDto) {
    let user: User;
    user = await this.userService.findOneByPhoneNumber(signUpUserDto.uuid);
    if (!user) {
      const createUserDto = new CreateUserDto(
        signUpUserDto.name,
        signUpUserDto.uuid,
      );
      user = await this.userService.create(createUserDto);
    }
    //console.log(`user ${JSON.stringify(user)}}`);

    const payload = { sub: user._id, role: user.role }; // sub due to jwt standard name
    const jwt = await this.jwtService.signAsync(payload);
    //console.log(`before \n${JSON.stringify(payload)}\n`);
    //console.log(`jwt \n${JSON.stringify(jwt)}\n`);
    return {
      token: jwt,
      userId: user._id,
    };
  }
}
