import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AddonOption } from './addonOption.schema';
import { ApiProperty } from '@nestjs/swagger';
import { LocalizedText } from '../../utils/schemas/localized-text.schema';

//@Schema()
export class AddonCategory {
  // @Prop()
  // name_en: string;
  //
  // @Prop()
  // name_ar: string;

  @ApiProperty({ name: 'name', type: Object })
  @Prop()
  name: LocalizedText;

  @Prop()
  min_selection: number;

  @Prop()
  max_selection: number;

  @Prop([AddonOption])
  options: AddonOption[];
}
