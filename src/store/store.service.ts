import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, Types } from 'mongoose';
import { Item, ItemDocument } from 'src/item/schemas/item.schema';
import { Language } from 'src/utils/enums/languages.enum';
import { CreateStoreDto } from './dto/create-store.dto';
import { StoreQueryOptions } from './dto/store-query-options.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store, StoreDocument } from './schemas/store.schema';
import { setFieldToSortBy } from 'src/utils/helpers/mongoose/set-field-to-sort-by.helper';
import { FindStoresWithCategoryItemsQueryParamsDto } from './dto/store-with-cat-items.dto';
import { User, UserDocument } from '../user/schemas/user.schema';
import { PaginationOptions } from '../utils/classes/paginate-options.class';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store.name)
    private readonly storeModel: Model<StoreDocument>,
    @InjectModel(Item.name)
    private readonly itemModel: Model<ItemDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createStoreDto: CreateStoreDto): Promise<Store> {
    // const createdCat = new this.storeModel(createStoreDto);
    // return createdCat.save(createStoreDto);
    return this.storeModel.create({
      ...createStoreDto,
      rating: 0.0,
    });
  }

  async findAll(
    storeQueryOptions: StoreQueryOptions,
    language: Language,
    userId: string,
  ) {
    const options = storeQueryOptions.paginationOptions;
    let user;
    if (userId && userId != 'null')
      user = await this.userModel.findById(userId);
    const aggregateIn = user ? { $in: ['$_id', user.favouriteStores] } : false;

    const getStoresWithUserFavField = this.storeModel.aggregate([
      { $project: { ...this.projectByLang(language, false) } },
      { $addFields: { isFavourite: aggregateIn } },
    ]);
    if (storeQueryOptions.sortField)
      getStoresWithUserFavField.sort(
        setFieldToSortBy(storeQueryOptions.sortField)['sort'],
      );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return this.storeModel.aggregatePaginate(
      getStoresWithUserFavField,
      options,
    );
  }

  findStoreItems(storeId: string): Promise<Item[]> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
    const projection = {};
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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

    store.set(updateStoreDto);
    return store.save();
  }

  remove(id: string) {
    if (!isValidObjectId(id))
      throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);

    return this.storeModel.deleteOne({ _id: id }).exec();
  }

  search(
    query: string,
    language: Language,
    paginationOptions: PaginationOptions,
  ) {
    const searchAgg = this.storeModel.aggregate([
      {
        $search: {
          index: 'storeNameIndex', // optional, defaults to "default"
          autocomplete: {
            query: `${query}`,
            path: language === Language.en ? 'name.en' : 'name.ar',
            fuzzy: {
              maxEdits: 1,
            },
          },
        },
      },
      { $project: this.projectByLang(language, false) },
    ]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return this.storeModel.aggregatePaginate(searchAgg, paginationOptions);
  }

  projectByLang(language: Language, paginating: boolean) {
    if (!paginating) {
      if (!language) return { __v: 0 }; // as $project needs anything inside
      return language === Language.en ? { 'name.ar': 0 } : { 'name.en': 0 };
    }
    if (!language) return { select: { __v: 0 } }; // as $project needs anything inside
    return language === Language.en
      ? { select: { 'name.ar': 0 } }
      : { select: { 'name.en': 0 } };
  }

  keepOnlyLocaleSpecificFieldsInSelection(lang: Language) {
    if ((lang as Language) === (Language.en as Language))
      return 'name_en image_url';
    else if ((lang as Language) === (Language.ar as Language))
      return 'name_ar image_url';
    else return 'name_en name_ar image_url';
  }

  private keepOnlyLocaleSpecificFieldsInProjection(
    options: Record<string, unknown>,
    lang: Language,
  ) {
    if ((lang as Language) === (Language.en as Language))
      Object.assign(options, { name_ar: 0 });
    else Object.assign(options, { name_en: 0 });
  }
}
