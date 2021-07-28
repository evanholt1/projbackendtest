import { StoreType } from 'src/utils/enums/store-type.enum';
import { Point } from 'src/utils/schemas/point.schema';
import { LocalizedText } from '../../utils/schemas/localized-text.schema';

export class CreateStoreDto {
  // name_en: string;
  //
  // name_ar: string;

  name: LocalizedText;

  image_url: string;

  location: Point;

  type: StoreType;
}
