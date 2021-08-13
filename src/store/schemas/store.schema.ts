import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { StoreType } from 'src/utils/enums/store-type.enum';
import { Point } from 'src/utils/schemas/point.schema';
import { LocalizedText } from '../../utils/schemas/localized-text.schema';

export type StoreDocument = Store & Document;

@Schema({ timestamps: true, strictQuery: true })
export class Store {
  @ApiProperty({ type: String })
  _id: string;

  // @Prop()
  // name_en: string;
  //
  // @Prop()
  // name_ar: string;

  @Prop()
  @ApiPropertyOptional({
    name: 'name',
    type: Object,
  })
  name: LocalizedText;

  @Prop()
  image_url: string;

  @Prop({ default: 0.0 })
  rating: number;

  // https://stackoverflow.com/questions/10196579/algorithm-used-to-calculate-5-star-ratings/38378697
  @Prop({ default: 0 })
  rating_count: number;

  @Prop({ index: '2dsphere' })
  location: Point;

  @Prop({ default: 10000 })
  maxDeliveryDistance: number;

  @ApiProperty({
    type: () => StoreType,
    enum: Object.keys(StoreType).filter((key) => Number.isNaN(parseInt(key))),
  })
  @Prop()
  type: StoreType;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
