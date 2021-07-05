import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store, StoreDocument } from './schemas/store.schema';

@Injectable()
export class StoreService {
   constructor(@InjectModel(Store.name) private storeModel: mongoose.Model<StoreDocument>) {}

  create(createStoreDto: CreateStoreDto): Promise<Store> {
    // const createdCat = new this.storeModel(createStoreDto);
    // return createdCat.save(createStoreDto);
    return this.storeModel.create(createStoreDto);
  }

  findAll(): Promise<Store[]> {
    return this.storeModel.find().exec();
  }

  findOne(id: string): Promise<Store> {
    if(!mongoose.isValidObjectId(id)) throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);

    return this.storeModel.findById(id).exec();
  }

  async update(id: string, updateStoreDto: UpdateStoreDto): Promise<Store> {
    if(!mongoose.isValidObjectId(id)) throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);

    const store = await this.storeModel.findById(id).exec();
    store.set(updateStoreDto);
    return store.save();
  }

  remove(id: string) {
    if(!mongoose.isValidObjectId(id)) throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);
    
    return this.storeModel.deleteOne({_id: id}).exec();
  }
}
