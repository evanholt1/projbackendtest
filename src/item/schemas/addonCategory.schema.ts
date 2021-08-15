import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AddonOption } from './addonOption.schema';
import { ApiProperty } from '@nestjs/swagger';
import { LocalizedText } from '../../utils/schemas/localized-text.schema';

//@Schema()
export class AddonCategory {
  @ApiProperty({ name: 'name', type: Object })
  @Prop()
  name: LocalizedText;

  @Prop()
  min_selection: number;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  @Prop({ validate: (val) => (!this.options ? 0 : val <= this.options.length) })
  max_selection: number;

  @Prop([AddonOption])
  options: AddonOption[];
}
