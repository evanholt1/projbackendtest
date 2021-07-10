import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<UserDocument>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    // const createdCat = new this.userModel(createUserDto);
    // return createdCat.save(createUserDto);
    return this.userModel.create(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(id: string): Promise<User> {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);

    return this.userModel.findById(id).exec();
  }

  findOneByPhoneNumber(phoneNumber: string): Promise<User> {
    return this.userModel.findOne({ phone_number: phoneNumber }).exec();
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