import { User } from '../../user/schemas/user.schema';
import { Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Item } from '../../item/schemas/item.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Store } from '../../store/schemas/store.schema';
import { OrderItem } from '../schemas/order-item.schema';

export class CreateOrderDto {
  @ApiProperty({ type: String })
  user: User;

  //@ApiProperty({ type: [String], isArray: true })
  items: OrderItem[];

  totalPrice: number;

  totalQuantity: number;
}
