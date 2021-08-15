import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Schema as schema, Document } from 'mongoose';
import { Category } from 'src/category/schemas/category.schema';
import { AddonCategory } from './addonCategory.schema';
import { LocalizedText } from '../../utils/schemas/localized-text.schema';

export type ItemDocument = Item & Document;

@Schema({ timestamps: true, validateBeforeSave: true })
export class Item {
  @ApiProperty({ type: String })
  _id: schema.Types.ObjectId;

  @ApiProperty({ name: 'name', type: Object })
  @Prop()
  name: LocalizedText;

  @Prop()
  price: number;

  @Prop({ default: 0, min: 0, max: 100 })
  discountValue: number;

  @ApiProperty({ name: 'description', type: Object })
  @Prop()
  description: LocalizedText;

  @Prop()
  image_url: string;

  @ApiProperty({ type: String })
  @Prop({ type: schema.Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop([AddonCategory])
  addonsByCat: AddonCategory[];

  @Prop({ min: 0, default: 0 })
  salesCount: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
