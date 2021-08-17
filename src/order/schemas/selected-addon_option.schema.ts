import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import { Schema, SchemaTypes, Types } from 'mongoose';
import { LocalizedText } from '../../utils/schemas/localized-text.schema';
import { AddonOption } from '../../item/schemas/addonOption.schema';

export class selectedAddonOption {
  @ApiProperty({ type: String })
  @Prop({ type: SchemaTypes.ObjectId, ref: 'AddonOption' })
  _id: Types.ObjectId;

  @ApiHideProperty()
  @Prop()
  name: LocalizedText;

  @Prop()
  price: number;
}
