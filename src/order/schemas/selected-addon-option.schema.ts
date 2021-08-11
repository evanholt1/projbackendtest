import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import { Schema, Types } from 'mongoose';
import { LocalizedText } from '../../utils/schemas/localized-text.schema';
import { AddonCategory } from '../../item/schemas/addonCategory.schema';
import { AddonOption } from '../../item/schemas/addonOption.schema';

export class selectedAddonOptionSchema {
  @ApiProperty({ type: String })
  @Prop({ type: Schema.Types.ObjectId, ref: 'AddonOption' })
  _id: AddonOption;
}
