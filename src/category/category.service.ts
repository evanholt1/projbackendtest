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
import { Item, ItemDocument } from 'src/item/schemas/item.schema';
import { Language } from '../utils/enums/languages.enum';
import { ItemService } from '../item/item.service';
import { PaginationOptions } from '../utils/classes/paginate-options.class';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: mongoose.Model<CategoryDocument>,
    @InjectModel(Item.name)
    private readonly ItemModel: mongoose.Model<ItemDocument>,
    @Inject(forwardRef(() => ItemService))
    private itemService: ItemService,
  ) {}
  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryModel.create(createCategoryDto);
  }

  findAll(language: Language, paginationOptions: PaginationOptions) {
    const options = {
      ...this.projectByLang(language, true),
      ...paginationOptions,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return this.categoryModel.paginate({}, options);
  }

  findOne(id: string) {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);

    return this.categoryModel.findById(id).exec();
  }

  findOneCatItems(
    id: string,
    language: Language,
    paginationOptions: PaginationOptions,
  ) {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);
    const options = {
      ...this.itemService.projectByLang(language, true),
      ...paginationOptions,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return this.ItemModel.paginate({ category: id }, options);
    // return this.ItemModel.find({
    //   category: id,
    // } as mongoose.FilterQuery<Item>).exec();
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);

    const category = await this.categoryModel.findById(id).exec();
    category.set(updateCategoryDto);
    return category.save();
  }

  remove(id: string) {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);

    return this.categoryModel.deleteOne({ _id: id }).exec();
  }

  projectByLang(language: Language, paginating: boolean) {
    // if false, you are aggregating
    if (!paginating) {
      if (!language) return { __v: 0 }; // as $project needs anything inside
      return language === Language.en ? { 'name.ar': 0 } : { 'name.en': 0 };
    }
    if (!language) return { select: { __v: 0 } }; // as $project needs anything inside
    return language === Language.en
      ? { select: { 'name.ar': 0 } }
      : { select: { 'name.en': 0 } };
  }

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
