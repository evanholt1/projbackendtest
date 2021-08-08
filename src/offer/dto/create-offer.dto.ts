import { LocalizedText } from '../../utils/schemas/localized-text.schema';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Store } from '../../store/schemas/store.schema';
import { Prop } from '@nestjs/mongoose';

export class CreateOfferDto {
  text: LocalizedText;

  @ApiPropertyOptional()
  affectedCategories: string[];
  @ApiPropertyOptional()
  affectedItems: string[];

  @ApiPropertyOptional()
  affectedStore: string;

  @ApiProperty({ default: false })
  isActive: boolean;

  @ApiProperty({ minimum: 0, maximum: 100 })
  discountValue: number;

  // startDate: Date;

  expiryDate: Date;
}
