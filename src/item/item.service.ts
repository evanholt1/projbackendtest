import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item, ItemDocument } from './schemas/item.schema';
import * as mongoose from 'mongoose';
import { Language } from '../utils/enums/languages.enum';
import { PaginationOptions } from '../utils/classes/paginate-options.class';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name) private itemModel: mongoose.Model<ItemDocument>,
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
    const arFields = {
      'name.ar': 0,
      'description.ar': 0,
      'addonsByCat.name.ar': 0,
      'addonsByCat.options.name.ar': 0,
    };

    const enFields = {
      'name.en': 0,
      'description.en': 0,
      'addonsByCat.name.en': 0,
      'addonsByCat.options.name.en': 0,
    };

    // for aggregates
    if (!paginating) {
      if (!language) return { __v: 0 }; // as $project needs anything inside
      return language === Language.en ? arFields : enFields;
    }
    if (!language) return {};

    return language === Language.en
      ? { select: arFields }
      : { select: enFields };
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
}
