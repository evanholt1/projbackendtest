import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/utils/decorators/public-route.decorator';
import { Role } from 'src/utils/enums/role.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/user/decorators/roles.decorator';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('/signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.userService.signUpUser(createUserDto);
  }

  @Public()
  //@ApiBearerAuth()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  //@Roles(Role.Admin)
  @Public()
  //@ApiBearerAuth()
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Public()
  //@ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  //@Public()
  @Roles()
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Public()
  //@ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
