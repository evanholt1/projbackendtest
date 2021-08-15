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
import { CategoryService } from '../category/category.service';
@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name)
    private itemModel: mongoose.Model<ItemDocument>,
    @Inject(forwardRef(() => CategoryService))
    private categoryService: CategoryService,
  ) {}
  create(createItemDto: CreateItemDto): Promise<Item> {
    return this.itemModel.create(createItemDto);
  }

  findAll(language: Language): Promise<Item[]> {
    return this.itemModel.find({}, this.projectByLang(language)).lean().exec();
  }

  // findStoreItemsByCat(language: Language, storeId: string) {
  //   const initialProject = {
  //     ...this.projectByLang(language, false),
  //   };
  //   console.log(initialProject);
  //   return this.itemModel.aggregate([
  //     [
  //       { $project: initialProject },
  //       { $match: { store: Types.ObjectId(storeId) } },
  //       { $group: { _id: '$category', items: { $push: '$$ROOT' } } },
  //       {
  //         $lookup: {
  //           from: 'categories',
  //           localField: '_id',
  //           foreignField: '_id',
  //           as: 'category',
  //         },
  //       },
  //       { $unwind: { path: '$category' } },
  //       { $sort: { _id: 1 } },
  //       { $project: this.projectCatInAggByLang(language) },
  //     ],
  //   ]);
  // }

  findOne(id: string): Promise<Item> {
    return this.itemModel.findById(id).lean().exec();
  }

  async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
    const item = await this.itemModel.findById(id).exec();

    item.set(updateItemDto);

    if (updateItemDto.addonsByCat) item.markModified('addonsByCat');

    return item.save();
  }

  remove(id: string) {
    return this.itemModel.deleteOne({ _id: id }).exec();
  }

  projectCategoryItemsByLang(language: Language) {
    const arFieldsRemoved = {
      'items.name.ar': 0,
      'items.description.ar': 0,
      'items.addonsByCat.name.ar': 0,
      'items.addonsByCat.options.name.ar': 0,
    };

    const enFieldsRemoved = {
      'items.name.en': 0,
      'items.description.en': 0,
      'items.addonsByCat.name.en': 0,
      'items.addonsByCat.options.name.en': 0,
    };

    return {
      'items.__v': 0,
      'items.createdAt': 0,
      'items.updatedAt': 0,
      ...(language === Language.en ? arFieldsRemoved : {}),
      ...(language === Language.ar ? enFieldsRemoved : {}),
    };
  }

  projectByLang(language: Language) {
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

    // as $project needs anything inside
    if (!language) return { __v: 0, createdAt: 0, updatedAt: 0 };
    return removedFields;
  }
}
