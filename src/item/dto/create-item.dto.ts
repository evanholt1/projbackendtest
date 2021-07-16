import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/category/schemas/category.schema';
import { Store } from 'src/store/schemas/store.schema';
import { AddonCategory } from '../schemas/addonCategory.schema';

export class CreateItemDto {
  name_en: string;

  name_ar: string;

  base_price: number;

  display_price: number;

  description_en: string;

  description_ar: string;

  image_url: string;

  store: string;

  category: string;

  addonsByCat: AddonCategory[];
}
