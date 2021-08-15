import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/category/schemas/category.schema';
import { Store } from 'src/store/schemas/store.schema';
import { AddonCategory } from '../schemas/addonCategory.schema';
import { LocalizedText } from '../../utils/schemas/localized-text.schema';
import { Min, Max, IsInt } from 'class-validator';
export class CreateItemDto {
  name: LocalizedText;

  description: LocalizedText;

  price: number;

  @IsInt()
  @Min(0)
  @Max(100)
  discountValue: number;

  image_url: string;

  category: string;

  addonsByCat: AddonCategory[];
}
