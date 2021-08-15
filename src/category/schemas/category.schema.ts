import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Item } from 'src/item/schemas/item.schema';
import { LocalizedText } from '../../utils/schemas/localized-text.schema';

export type CategoryDocument = Category & mongoose.Document;

@Schema({ timestamps: true })
export class Category {
  @ApiProperty({ type: String })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  name: LocalizedText;

  @Prop()
  icon_url: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
