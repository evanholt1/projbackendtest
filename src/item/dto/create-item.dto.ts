import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/category/schemas/category.schema';
import { Store } from 'src/store/schemas/store.schema';

export class CreateItemDto {
  name_en: string;

  name_ar: string;

  base_price: number;

  display_price: number;

  description_en: string;

  description_ar: string;

  image_url: string;

  store: Store;

  category: Category;
}
