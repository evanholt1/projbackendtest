import { LocalizedText } from '../../utils/schemas/localized-text.schema';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Store } from '../../store/schemas/store.schema';
import { Prop } from '@nestjs/mongoose';
import { Schema, Types } from 'mongoose';

export class CreateOfferDto {
  text: LocalizedText;

  @ApiPropertyOptional({ type: [String], isArray: true })
  affectedCategories: string[] | Types.ObjectId[];
  @ApiPropertyOptional({ type: [String], isArray: true })
  affectedItems: string[] | Types.ObjectId[];

  @ApiPropertyOptional({ type: String })
  affectedStore: string | Types.ObjectId;

  @ApiProperty({ default: false })
  isActive: boolean;

  @ApiProperty({ minimum: 0, maximum: 100 })
  discountValue: number;

  // startDate: Date;

  expiryDate: Date;
}
