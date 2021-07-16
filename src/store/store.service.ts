import { Get, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { FilterQuery } from 'mongoose';
import { Item, ItemDocument } from 'src/item/schemas/item.schema';
import { PaginateOptions } from 'src/utils/classes/paginate-options.class';
import { Public } from 'src/utils/decorators/public-route.decorator';
import { CreateStoreDto } from './dto/create-store.dto';
import { StoreQueryFiltersDto } from './dto/store-query-filters.dto';
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

  async create(createStoreDto: CreateStoreDto): Promise<Store> {
    // const createdCat = new this.storeModel(createStoreDto);
    // return createdCat.save(createStoreDto);
    console.log(createStoreDto.location);
    const store = await this.storeModel.create({
      ...createStoreDto,
      rating: 0.0,
    });
    console.log(store);
    return store;
  }

  findAll(queryFilters: StoreQueryFiltersDto): Promise<Store[]> {
    //const options: PaginateOptions = new PaginateOptions({limit: queryFilters.paginationOptions.});
    //@ts-ignore
    return this.storeModel.paginate(queryFilters);
  }

  findAllItems(storeId: string): Promise<Item[]> {
    //@ts-ignore
    return this.ItemModel.paginate({ store: storeId });
    // return this.ItemModel.find({
    //   store: storeId,
    // } as FilterQuery<Item>).exec(); // for relation "no overload" error
  }

  findOne(id: string): Promise<Store> {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);

    return this.storeModel.findById(id).exec();
  }

  async update(id: string, updateStoreDto: UpdateStoreDto): Promise<Store> {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);
    console.log('id ' + id);
    const store = await this.storeModel.findOne({ _id: id }).exec();
    //const store = await this.storeModel.findById(id).exec();
    console.log('stores ' + (await this.storeModel.find().exec()));
    store.set(updateStoreDto);
    return store.save();
  }

  remove(id: string) {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);

    return this.storeModel.deleteOne({ _id: id }).exec();
  }
}
