import { Point } from 'src/utils/schemas/point.schema';

export class CreateStoreDto {
  name_en: string;

  name_ar: string;

  image_url: string;

  location: Point;
}
