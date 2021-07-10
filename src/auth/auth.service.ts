import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { SignUpUserDto } from './dto/user-signup.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signUpUser(signUpUserDto: SignUpUserDto): Promise<string> {
    var user;
    user = await this.userService.findOneByPhoneNumber(
      signUpUserDto.phoneNumber,
    );
    if (!user) {
      const createUserDto = new CreateUserDto(
        signUpUserDto.name,
        signUpUserDto.phoneNumber,
      );
      user = await this.userService.create(createUserDto);
    }
    console.log(`user ${JSON.stringify(user)}}`);

    const payload = { sub: user._id, role: user.role }; // sub due to jwt standard name
    const jwt = await this.jwtService.signAsync(payload);
    console.log(`before \n${JSON.stringify(payload)}\n`);
    console.log(`jwt \n${JSON.stringify(jwt)}\n`);
    return jwt;
  }
  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
