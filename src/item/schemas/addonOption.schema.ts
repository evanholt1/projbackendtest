import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { LocalizedText } from '../../utils/schemas/localized-text.schema';

//@Schema()
export class AddonOption {
  // @Prop()
  // name_en: string;
  //
  // @Prop()
  // name_ar: string;

  @ApiProperty({ name: 'name', type: Object })
  @Prop()
  name: LocalizedText;

  @Prop()
  base_price: number;

  @Prop()
  display_price: number;
}
