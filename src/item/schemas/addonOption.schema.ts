import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

//@Schema()
export class AddonOption {
  @Prop()
  name_en: string;

  @Prop()
  name_ar: string;

  @Prop()
  base_price: number;

  @Prop()
  display_price: number;
}
