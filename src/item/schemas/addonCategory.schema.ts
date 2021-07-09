import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AddonOption } from './addonOption.schema';

//@Schema()
export class AddonCategory {
  name_en: string;

  @Prop()
  name_ar: string;

  @Prop()
  min_selection: number;

  @Prop()
  max_selection: number;

  @Prop([AddonOption])
  options: AddonOption[];
}
