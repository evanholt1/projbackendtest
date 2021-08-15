import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { LocalizedText } from '../../utils/schemas/localized-text.schema';

//@Schema()
export class AddonOption {
  @ApiProperty({ name: 'name', type: Object })
  @Prop()
  name: LocalizedText;

  @Prop()
  price: number;
}
