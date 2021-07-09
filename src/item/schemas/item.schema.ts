import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
//import * as mongoose from 'mongoose';
import { Schema as schema, Document } from 'mongoose';
import { Category } from 'src/category/schemas/category.schema';
import { Store } from 'src/store/schemas/store.schema';
import { AddonCategory } from './addonCategory.schema';

export type ItemDocument = Item & Document;

@Schema({ timestamps: true })
export class Item {
  @ApiProperty({ type: String })
  _id: schema.Types.ObjectId;

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

  @ApiProperty({ type: String })
  @Prop({ type: schema.Types.ObjectId, ref: 'Store' })
  store: Store;

  @ApiProperty({ type: String })
  @Prop({ type: schema.Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop([AddonCategory])
  addonsByCat: AddonCategory[];
}

export const ItemSchema = SchemaFactory.createForClass(Item);
