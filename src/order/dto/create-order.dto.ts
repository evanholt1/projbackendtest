import { User } from '../../user/schemas/user.schema';
import { Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Item } from '../../item/schemas/item.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  user: User;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }])
  items: Item[];

  @Prop()
  totalPrice: number;

  @Prop()
  totalQuantity: number;
}
