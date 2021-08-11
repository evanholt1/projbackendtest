import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import { Schema, Types } from 'mongoose';
import { LocalizedText } from '../../utils/schemas/localized-text.schema';
import { AddonCategory } from '../../item/schemas/addonCategory.schema';
import { AddonOption } from '../../item/schemas/addonOption.schema';
import { selectedAddonOptionSchema } from './selected-addon-option.schema';

export class SelectedAddonCategory {
  @ApiProperty({ type: String })
  @Prop({ type: Schema.Types.ObjectId, ref: 'AddonCategory' })
  _id: AddonCategory;

  @ApiProperty({ type: [String], isArray: true })
  @Prop({ type: [Schema.Types.ObjectId], ref: 'AddonOption' })
  selectedOptions: AddonOption[];
}
