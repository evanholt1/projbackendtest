
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop()
  name_en: string;

  @Prop()
  name_ar: string;

  @Prop()
  icon_url: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);