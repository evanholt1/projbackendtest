import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { FilterQuery } from 'mongoose';
import { Item, ItemDocument } from 'src/item/schemas/item.schema';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store, StoreDocument } from './schemas/store.schema';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store.name)
    private readonly storeModel: mongoose.Model<StoreDocument>,
    @InjectModel(Item.name)
    private readonly ItemModel: mongoose.Model<ItemDocument>,
  ) {}

  create(createStoreDto: CreateStoreDto): Promise<Store> {
    // const createdCat = new this.storeModel(createStoreDto);
    // return createdCat.save(createStoreDto);
    return this.storeModel.create(createStoreDto);
  }

  findAll(): Promise<Store[]> {
    return this.storeModel.find().exec();
  }

  findAllItems(storeId: string): Promise<Item[]> {
    return this.ItemModel.find({
      store: storeId,
    } as FilterQuery<Item>).exec(); // for relation "no overload" error
  }

  findOne(id: string): Promise<Store> {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);

    return this.storeModel.findById(id).exec();
  }

  async update(id: string, updateStoreDto: UpdateStoreDto): Promise<Store> {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);

    const store = await this.storeModel.findById(id).exec();
    store.set(updateStoreDto);
    return store.save();
  }

  remove(id: string) {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);

    return this.storeModel.deleteOne({ _id: id }).exec();
  }
}
