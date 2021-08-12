import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item, ItemDocument } from './schemas/item.schema';
import * as mongoose from 'mongoose';
import { Language } from '../utils/enums/languages.enum';
import { PaginationOptions } from '../utils/classes/paginate-options.class';
import { Types } from 'mongoose';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name) private itemModel: mongoose.Model<ItemDocument>,
    @Inject(forwardRef(() => CategoryService))
    private categoryService: CategoryService,
  ) {}
  create(createItemDto: CreateItemDto): Promise<Item> {
    return this.itemModel.create(createItemDto);
  }

  findAll(
    language: Language,
    paginationOptions: PaginationOptions,
  ): Promise<Item[]> {
    const options = {
      //populate: 'store',
      ...this.projectByLang(language, true),
      ...paginationOptions,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return this.itemModel.paginate({}, options);
  }

  findStoreItemsByCat(language: Language, storeId: string) {
    const initialProject = {
      ...this.projectByLang(language, false),
    };
    console.log(initialProject);
    return this.itemModel.aggregate([
      [
        { $project: initialProject },
        { $match: { store: Types.ObjectId(storeId) } },
        { $group: { _id: '$category', items: { $push: '$$ROOT' } } },
        {
          $lookup: {
            from: 'categories',
            localField: '_id',
            foreignField: '_id',
            as: 'category',
          },
        },
        { $unwind: { path: '$category' } },
        { $sort: { _id: 1 } },
        { $project: this.projectCatInAggByLang(language) },
      ],
    ]);
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
    if (updateItemDto.addonsByCat) item.markModified('addonsByCat');

    return item.save();
  }

  remove(id: string) {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);

    return this.itemModel.deleteOne({ _id: id }).exec();
  }

  projectByLang(language: Language, paginating: boolean) {
    const arFieldsRemoved = {
      'name.ar': 0,
      'description.ar': 0,
      'addonsByCat.name.ar': 0,
      'addonsByCat.options.name.ar': 0,
    };

    const enFieldsRemoved = {
      'name.en': 0,
      'description.en': 0,
      'addonsByCat.name.en': 0,
      'addonsByCat.options.name.en': 0,
    };

    const removedFields = {
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
      ...(language === Language.en ? arFieldsRemoved : {}),
      ...(language === Language.ar ? enFieldsRemoved : {}),
    };

    // for aggregates
    if (!paginating) {
      if (!language) return { __v: 0 }; // as $project needs anything inside
      return removedFields;
    }
    if (!language) return {};

    return language === Language.en
      ? { select: removedFields }
      : { select: removedFields };
  }

  projectCatInAggByLang(language) {
    const removedFields = {
      'category.createdAt': 0,
      'category.updatedAt': 0,
      _id: 0,
      'category.__v': 0,
      ...(language === Language.en ? { 'category.name.ar': 0 } : {}),
      ...(language === Language.ar ? { 'category.name.en': 0 } : {}),
    };
    return removedFields;
  }

  // async localize(): Promise<string> {
  //   console.log('here');
  //   const docs: ItemDocument[] = await this.itemModel.find().exec();
  //   const promises = docs.map((doc) => {
  //     doc.name = { en: doc.name_en, ar: doc.name_ar };
  //     doc.description = { en: doc.description_en, ar: doc.description_ar };
  //     doc.addonsByCat.forEach((addonCat) => {
  //       addonCat.name = { en: addonCat.name_en, ar: addonCat.name_ar };
  //       addonCat.options.forEach((addonOption) => {
  //         addonOption.name = {
  //           en: addonOption.name_en,
  //           ar: addonOption.name_ar,
  //         };
  //       });
  //     });
  //     doc.markModified('addonsByCat');
  //     return doc.save();
  //   });
  //   await Promise.all(promises);
  //   return 'Success';
  // }

  // async addDiscount() {
  //   const items = await this.itemModel.find().exec();
  //   const promise = items.map((item) => {
  //     item.price_discount_percentage = 0;
  //     item.save();
  //   });
  //   return Promise.all(promise);
  // }
}
