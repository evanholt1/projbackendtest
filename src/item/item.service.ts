import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item, ItemDocument } from './schemas/item.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name) private itemModel: mongoose.Model<ItemDocument>,
  ) {}
  create(createItemDto: CreateItemDto): Promise<Item> {
    return this.itemModel.create(createItemDto);
  }

  findAll(): Promise<Item[]> {
    return this.itemModel.find().populate('store').exec();
  }

  findOne(id: string): Promise<Item> {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);

    return this.itemModel.findById(id).exec();
  }

  async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);

    const item = await this.itemModel.findById(id).exec();

    item.set(updateItemDto);

    return item.save();
  }

  remove(id: string) {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);

    return this.itemModel.deleteOne({ _id: id }).exec();
  }
}
