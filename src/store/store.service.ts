import { Get, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Item, ItemDocument } from 'src/item/schemas/item.schema';
import { PaginateOptions } from 'src/utils/classes/paginate-options.class';
import { Language } from 'src/utils/enums/languages.enum';
import { CreateStoreDto } from './dto/create-store.dto';
import { StoreQueryOptions } from './dto/store-query-options.dto';
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

  findAll(storeQueryOptions: StoreQueryOptions): Promise<Store[]> {
    let options = { ...storeQueryOptions.paginationOptions };
    this.keepOnlyLocaleSpecificFields(storeQueryOptions.language, options);
    this.addLeanOption(options);

    //@ts-ignore
    return this.storeModel.paginate(storeQueryOptions, options);
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

  private keepOnlyLocaleSpecificFields(lang: Language, options: Object) {
    if ((lang as Language) === (Language.en as Language))
      Object.assign(options, { select: '-name_ar' });
    else Object.assign(options, { select: '-name_en' });
  }

  private addLeanOption(options: Object) {
    Object.assign(options, { lean: true });
  }
}
