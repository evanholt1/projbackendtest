import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Item } from '../../item/schemas/item.schema';
import { AddonCategory } from '../../item/schemas/addonCategory.schema';
import { SelectedAddonCategory } from './selected-addon-category.schema';

export class OrderItem {
  @ApiProperty({ type: String })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Item' })
  item: Item;

  @Prop()
  @ApiProperty()
  quantity: number;

  @Prop()
  @ApiProperty()
  totalItemPrice: number;

  @Prop()
  @ApiProperty()
  totalSingleItemPrice: number;

  selectedAddonCats: SelectedAddonCategory[];
}
