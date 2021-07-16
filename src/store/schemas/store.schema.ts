import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Point } from 'src/utils/schemas/point.schema';

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

  @Prop()
  location: Point;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
