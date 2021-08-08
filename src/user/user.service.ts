import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Role } from 'src/utils/enums/role.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Types } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signUpUser(signUpUserDto: CreateUserDto) {
    // signUpUserDto.favouriteStores = signUpUserDto.favouriteStores.map(
    //   (e) => new Types.ObjectId(e),
    // );
    if (signUpUserDto.favouriteStores)
      signUpUserDto.favouriteStores = signUpUserDto.favouriteStores.map(
        (e) => new Types.ObjectId(e),
      );
    let user: User;
    user = await this.findOneByUUID(signUpUserDto.uuid);

    if (!user) {
      //signUpUserDto.role = Role.User;
      user = await this.create(signUpUserDto);
    }
    const payload = { sub: user._id, role: user.role }; // "sub" due to jwt standard name
    const jwt = await this.jwtService.signAsync(payload);
    return {
      token: jwt,
      userId: user._id,
    };
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create({ ...createUserDto, role: Role.User });
  }

  findAll(): Promise<User[]> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return this.userModel.paginate();
    //return this.userModel.find().exec();
  }

  findOne(id: string): Promise<User> {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);

    return this.userModel.findById(id).exec();
  }

  async findOneByUUID(uuid: string) {
    return this.userModel.findOne({ uuid: uuid }).exec();
  }

  async findUserByUUID(uuid: string) {
    const user = await this.userModel.findOne({ uuid: uuid }).exec();
    if (!user)
      throw new HttpException('That UID is not found!', HttpStatus.NOT_FOUND);
    const payload = { sub: user._id, role: user.role }; // "sub" due to jwt standard name
    const jwt = await this.jwtService.signAsync(payload);
    return {
      token: jwt,
      user: user,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);

    const user = await this.userModel.findById(id).exec();
    user.set(updateUserDto);
    return user.save();
  }

  remove(id: string) {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);

    return this.userModel.deleteOne({ _id: id }).exec();
  }
}
