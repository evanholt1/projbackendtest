import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import * as mongoose from 'mongoose';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './schemas/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Item, ItemDocument } from 'src/item/schemas/item.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: mongoose.Model<CategoryDocument>,
    @InjectModel(Item.name)
    private readonly ItemModel: mongoose.Model<ItemDocument>,
  ) {}
  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryModel.create(createCategoryDto);
  }

  findAll() {
    return this.categoryModel.find().exec();
  }

  findOne(id: string) {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);

    return this.categoryModel.findById(id).exec();
  }

  findOneCatItems(id: string) {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);

    //let nid = new mongoose.Types.ObjectId(id);
    return this.ItemModel.find({
      category: id,
    } as mongoose.FilterQuery<Item>).exec();
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
}
