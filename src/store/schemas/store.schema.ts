import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Language } from 'src/utils/enums/languages.enum';
import { StoreType } from 'src/utils/enums/store-type.enum';
import { Point } from 'src/utils/schemas/point.schema';
import { LocalizedText } from '../../utils/schemas/localized-text.schema';
import { Type } from 'class-transformer';
import { PaginateOptions } from '../../utils/classes/paginate-options.class';

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

  @Prop()
  rating: number;

  @Prop()
  location: Point;

  @ApiProperty({
    type: () => StoreType,
    enum: Object.keys(StoreType).filter((key) => Number.isNaN(parseInt(key))),
  })
  @Prop()
  type: StoreType;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
