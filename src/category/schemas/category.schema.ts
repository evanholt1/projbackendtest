import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Item } from 'src/item/schemas/item.schema';

export type CategoryDocument = Category & mongoose.Document;

@Schema()
export class Category {
  @Prop()
  _id: mongoose.Types.ObjectId;

  @Prop()
  name_en: string;

  @Prop()
  name_ar: string;

  @Prop()
  icon_url: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
