import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Category } from 'src/category/schemas/category.schema';
import { Store } from 'src/store/schemas/store.schema';

export type ItemDocument = Item & mongoose.Document;

@Schema()
export class Item {
  @Prop()
  _id: mongoose.Types.ObjectId;

  @ApiProperty()
  @Prop()
  name_en: string;

  @Prop()
  name_ar: string;

  @Prop()
  base_price: number;

  @Prop()
  display_price: number;

  @Prop()
  description_en: string;

  @Prop()
  description_ar: string;

  @Prop()
  image_url: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Store' })
  store: Store;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
