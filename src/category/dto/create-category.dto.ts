import { LocalizedText } from '../../utils/schemas/localized-text.schema';
import { IsUrl, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCategoryDto {
  @ValidateNested() // this and the below are required for class-validator to do nested object validation
  @Type(() => LocalizedText)
  name: LocalizedText;

  @IsUrl()
  icon_url: string;
}
