import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

export type StoreDocument = Store & Document;

@Schema({ timestamps: true })
export class Store {
  @ApiProperty({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop()
  name_en: string;

  @Prop()
  name_ar: string;

  @Prop()
  image_url: string;

  @Prop()
  rating: number;

  @Prop()
  available_quantity: number;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
