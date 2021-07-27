import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Language } from 'src/utils/enums/languages.enum';
import { StoreType } from 'src/utils/enums/store-type.enum';
import { Point } from 'src/utils/schemas/point.schema';
import { LandingCardSize } from '../enums/landing-card-size.enum';
import { LocalizedText } from '../../utils/schemas/localized-text.schema';

export type LandingCardDocument = LandingCard & Document;

// full has all fields, while mini size has only title, subtitle, and image
@Schema({ timestamps: true, strictQuery: true })
export class LandingCard {
  @ApiProperty({ type: String })
  _id: string;

  @Prop()
  title: LocalizedText;

  @Prop()
  subtitle: LocalizedText;

  @Prop()
  body: LocalizedText;

  @Prop()
  image_url: string;

  @ApiProperty({
    type: () => LandingCardSize,
    enum: Object.keys(LandingCardSize).filter((key) =>
      Number.isNaN(parseInt(key)),
    ),
  })
  @Prop()
  size: LandingCardSize;

  @ApiProperty({
    type: () => StoreType,
    enum: Object.keys(StoreType).filter((key) => Number.isNaN(parseInt(key))),
  })
  @Prop()
  type: StoreType;

  // @Prop()
  // title_en: string;
  //
  // @Prop()
  // title_ar: string;

  // @Prop()
  // subtitle_en: string;
  //
  // @Prop()
  // subtitle_ar: string;

  // @Prop()
  // body_en: string;
  //
  // @Prop()
  // body_ar: string;
}

export const LandingCardSchema = SchemaFactory.createForClass(LandingCard);
