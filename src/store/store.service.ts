import { Get, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId, Types } from 'mongoose';
import { Item, ItemDocument } from 'src/item/schemas/item.schema';
import { Language } from 'src/utils/enums/languages.enum';
import { addLeanOption } from 'src/utils/helpers/mongoose/add-lean-option';
import { CreateStoreDto } from './dto/create-store.dto';
import { StoreQueryOptions } from './dto/store-query-options.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store, StoreDocument } from './schemas/store.schema';
import { setFieldToSortBy } from 'src/utils/helpers/mongoose/set-field-to-sort-by.helper';
import { Category } from 'src/category/schemas/category.schema';
import { StoreType } from 'src/utils/enums/store-type.enum';
import { FindStoresWithCategoryItemsQueryParamsDto } from './dto/store-with-cat-items.dto';
@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store.name)
    private readonly storeModel: Model<StoreDocument>,
    @InjectModel(Item.name)
    private readonly itemModel: Model<ItemDocument>,
  ) {}

  async create(createStoreDto: CreateStoreDto): Promise<Store> {
    // const createdCat = new this.storeModel(createStoreDto);
    // return createdCat.save(createStoreDto);
    const store = await this.storeModel.create({
      ...createStoreDto,
      rating: 0.0,
    });
    return store;
  }

  findAll(storeQueryOptions: StoreQueryOptions): Promise<Store[]> {
    let options = { ...storeQueryOptions.paginationOptions };
    this.keepOnlyLocaleSpecificFieldsInSelection(
      options,
      storeQueryOptions.language,
    );
    addLeanOption(options);
    if (storeQueryOptions.sortField)
      setFieldToSortBy(options, storeQueryOptions.sortField);
    //@ts-ignore
    return this.storeModel.paginate(storeQueryOptions, options);
  }

  findStoreItems(storeId: string): Promise<Item[]> {
    //@ts-ignore
    return this.itemModel.paginate({ store: storeId });
    // return this.ItemModel.find({
    //   store: storeId,
    // } as FilterQuery<Item>).exec(); // for relation "no overload" error
  }

  findStoresWithCategoryItems(
    findStoresWithCategoryItemsQueryParamsDto: FindStoresWithCategoryItemsQueryParamsDto,
  ) {
    const dto = findStoresWithCategoryItemsQueryParamsDto;
    let projection = {};
    this.keepOnlyLocaleSpecificFieldsInProjection(projection, dto.language);

    const findStoresWithCategoryItemsAggregate = this.itemModel.aggregate([
      { $match: { category: Types.ObjectId(dto.categoryId) } },
      { $group: { _id: '$store' } },
      {
        $lookup: {
          from: 'stores',
          let: { itemId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$_id', '$$itemId'] },
                    { $eq: ['$type', 'restaurant'] },
                  ],
                },
              },
            },
          ],
          as: 'rests_with_cat_items',
        },
      },
      { $unwind: '$rests_with_cat_items' },
      { $replaceRoot: { newRoot: '$rests_with_cat_items' } },
      { $project: projection },
    ]);
    //@ts-ignore
    return this.itemModel.aggregatePaginate(
      findStoresWithCategoryItemsAggregate,
      dto.paginationOptions,
    );
  }

  findOne(id: string): Promise<Store> {
    if (!isValidObjectId(id))
      throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);

    return this.storeModel.findById(id).exec();
  }

  async update(id: string, updateStoreDto: UpdateStoreDto): Promise<Store> {
    if (!isValidObjectId(id))
      throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);
    const store = await this.storeModel.findOne({ _id: id }).exec();
    //const store = await this.storeModel.findById(id).exec();
    console.log('stores ' + (await this.storeModel.find().exec()));
    store.set(updateStoreDto);
    return store.save();
  }

  remove(id: string) {
    if (!isValidObjectId(id))
      throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);

    return this.storeModel.deleteOne({ _id: id }).exec();
  }

  private keepOnlyLocaleSpecificFieldsInSelection(
    options: Object,
    lang: Language,
  ) {
    if ((lang as Language) === (Language.en as Language))
      Object.assign(options, { select: '-name_ar' });
    else Object.assign(options, { select: '-name_en' });
  }

  private keepOnlyLocaleSpecificFieldsInProjection(
    options: Object,
    lang: Language,
  ) {
    if ((lang as Language) === (Language.en as Language))
      Object.assign(options, { name_ar: 0 });
    else Object.assign(options, { name_en: 0 });
  }
}
