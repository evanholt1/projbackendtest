import { LandingCardSize } from '../enums/landing-card-size.enum';
import { LocalizedText } from '../../utils/schemas/localized-text.schema';

export class CreateLandingCardDto {
  title: LocalizedText;
  subtitle: LocalizedText;
  body: LocalizedText;
  // title_en: string;
  // title_ar: string;
  image_url: string;
  // subtitle_en: string;
  // subtitle_ar: string;
  // body_en: string;
  // body_ar: string;
  size: LandingCardSize;
}
