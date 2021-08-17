import { Prop } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Item } from '../../item/schemas/item.schema';
import { SelectedAddonCategory } from './selected-addon-category.schema';
import { SchemaTypes, Types } from 'mongoose';
import { LocalizedText } from '../../utils/schemas/localized-text.schema';

export class OrderItem {
  @ApiProperty({ type: String })
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Item' })
  item: Types.ObjectId;

  @Prop()
  @ApiProperty()
  quantity: number;

  @Prop()
  @ApiProperty()
  totalItemPrice: number;

  @Prop()
  @ApiProperty()
  totalSingleItemPrice: number;

  @ApiHideProperty()
  @Prop()
  name: LocalizedText;

  @Prop()
  selectedAddonCats: SelectedAddonCategory[];
}
