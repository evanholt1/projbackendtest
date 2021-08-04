import { User } from '../../user/schemas/user.schema';
import { Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Item } from '../../item/schemas/item.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Store } from '../../store/schemas/store.schema';

export class CreateOrderDto {
  user: User;

  @ApiProperty({ type: [String], isArray: true })
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }])
  items: Item[];

  @Prop()
  totalPrice: number;

  @Prop()
  totalQuantity: number;

  @ApiProperty({ type: String })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Store' })
  store: Store;
}
