import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import * as mongoose from 'mongoose';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './schemas/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Language } from '../utils/enums/languages.enum';
import { ItemService } from '../item/item.service';
import { Item, ItemDocument } from '../item/schemas/item.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: mongoose.Model<CategoryDocument>,
    @InjectModel(Item.name)
    private ItemModel: mongoose.Model<ItemDocument>,
    @Inject(forwardRef(() => ItemService))
    private itemService: ItemService,
  ) {}
  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryModel.create(createCategoryDto);
  }

  findAll(language: Language) {
    return this.categoryModel.find({}, this.projectByLang(language));
  }

  findOne(id: string) {
    return this.categoryModel.findById(id).exec();
  }

  findWithItems(language: Language) {
    return this.categoryModel.aggregate([
      {
        $lookup: {
          from: 'items',
          localField: '_id',
          foreignField: 'category',
          as: 'items',
        },
      },
      { $addFields: { items_length: { $size: '$items' } } },
      { $match: { items_length: { $gt: 0 } } },
      {
        $project: {
          ...this.projectByLang(language),
          ...this.itemService.projectCategoryItemsByLang(language),
        },
      },
    ]);
  }

  findOneCatItems(id: string, language: Language) {
    //return this.ItemModel.paginate({ category: id }, options);
    return this.ItemModel.find(
      {
        category: id,
      } as mongoose.FilterQuery<Item>,
      this.itemService.projectByLang(language),
    ).exec();
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryModel.findById(id).exec();

    category.set(updateCategoryDto);

    return category.save();
  }

  remove(id: string) {
    return this.categoryModel.deleteOne({ _id: id }).exec();
  }

  projectByLang(language: Language) {
    if (!language) return {};
    if (language == Language.en) return { 'name.ar': 0 };
    if (language == Language.ar) return { 'name.en': 0 };
  }

  // projectByLang(language: Language, paginating: boolean) {
  //   // if false, you are aggregating
  //   if (!paginating) {
  //     if (!language) return { __v: 0 }; // as $project needs anything inside
  //     return language === Language.en ? { 'name.ar': 0 } : { 'name.en': 0 };
  //   }
  //   if (!language) return { select: { __v: 0 } }; // as $project needs anything inside
  //   return language === Language.en
  //     ? { select: { 'name.ar': 0 } }
  //     : { select: { 'name.en': 0 } };
  // }
  //
  // projectGetCategoriesByLang(language: Language) {
  //   if (!language) return {};
  //   if (language == Language.en) return { 'categories.name.ar': 0 };
  //   if (language == Language.ar) return { 'categories.name.en': 0 };
  // }

  // async localize() {
  //   const docs = await this.categoryModel.find().exec();
  //   const promises = docs.map((doc) => {
  //     doc.name = { en: doc.name_en, ar: doc.name_ar };
  //     return doc.save();
  //   });
  //   await Promise.all(promises);
  //   return 'success';
  // }
}

// old store categories aggregate
// const aggregate = this.storeModel.aggregate([
//   {
//     $match: {
//       type: storeType,
//     },
//   },
//   {
//     $project: {
//       _id: 1,
//     },
//   },
//   {
//     $lookup: {
//       from: 'items',
//       let: {
//         storeId: '$_id',
//       },
//       pipeline: [
//         {
//           $match: {
//             $expr: {
//               $eq: ['$store', '$$storeId'],
//             },
//           },
//         },
//         {
//           $project: {
//             category: 1,
//             _id: 0,
//           },
//         },
//       ],
//       as: 'items',
//     },
//   },
//   {
//     $unwind: {
//       path: '$items',
//       preserveNullAndEmptyArrays: false,
//     },
//   },
//   {
//     $group: {
//       _id: null,
//       storeTypeItemCategories: {
//         $addToSet: '$items',
//       },
//     },
//   },
//   {
//     $lookup: {
//       from: 'categories',
//       localField: 'storeTypeItemCategories.category',
//       foreignField: '_id',
//       as: 'categories',
//     },
//   },
//   {
//     $project: {
//       ...this.projectGetCategoriesByLang(language),
//       storeTypeItemCategories: 0,
//       _id: 0,
//     },
//   },
// ]
