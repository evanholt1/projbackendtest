import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type StoreDocument = Store & Document;

@Schema()
export class Store {
  @Prop()
  _id: Types.ObjectId;

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
