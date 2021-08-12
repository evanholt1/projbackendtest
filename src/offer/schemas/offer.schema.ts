import mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  ApiExtraModels,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { LocalizedText } from '../../utils/schemas/localized-text.schema';
import { Schema as MongooseSchema, Model, Document, Types } from 'mongoose';
import { Category } from '../../category/schemas/category.schema';
import { Item } from '../../item/schemas/item.schema';
import { Store } from '../../store/schemas/store.schema';
export type OfferDocument = Offer & Document;

@Schema({ timestamps: true })
export class Offer {
  @ApiProperty({ type: String })
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  text: LocalizedText;

  @ApiPropertyOptional({ type: String })
  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: Category.name }])
  affectedCategories: Category[] | Types.ObjectId[];

  @ApiPropertyOptional({ type: String })
  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: Item.name }])
  affectedItems: Item[] | Types.ObjectId[];

  @ApiPropertyOptional({ type: String })
  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: Store.name }])
  affectedStore: Store | Types.ObjectId;

  @ApiProperty({ minimum: 0, maximum: 100 })
  @Prop()
  discountValue: number;

  @Prop({ default: false })
  isActive: boolean;

  // @Prop({ type: Date, required: true })
  // startDate: Date;

  @Prop({ type: Date, required: true })
  expiryDate: Date;
}

export const OfferSchema = SchemaFactory.createForClass(Offer);
