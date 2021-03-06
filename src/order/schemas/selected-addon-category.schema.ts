import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import { Schema, SchemaTypes, Types } from 'mongoose';
import { LocalizedText } from '../../utils/schemas/localized-text.schema';
import { AddonCategory } from '../../item/schemas/addonCategory.schema';
import { AddonOption } from '../../item/schemas/addonOption.schema';
import { selectedAddonOption } from './selected-addon_option.schema';

export class SelectedAddonCategory {
  @ApiProperty({ type: String })
  @Prop({ type: SchemaTypes.ObjectId, ref: 'AddonCategory' })
  _id: Types.ObjectId;

  @ApiHideProperty()
  @Prop()
  name: LocalizedText;

  // @ApiProperty({ type: [String], isArray: true })
  @Prop()
  selectedOptions: selectedAddonOption[];
}
