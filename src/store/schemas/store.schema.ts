import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

export type StoreDocument = Store & Document;

@Schema({ timestamps: true, strictQuery: true })
export class Store {
  @ApiProperty({ type: String })
  _id: string;

  @Prop()
  name_en: string;

  @Prop()
  name_ar: string;

  @Prop()
  image_url: string;

  @Prop()
  rating: number;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
