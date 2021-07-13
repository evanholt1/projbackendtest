import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Item } from 'src/item/schemas/item.schema';
import { User } from 'src/user/schemas/user.schema';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @ApiProperty({ type: String })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }])
  items: Item[];

  @Prop()
  totalPrice: number;

  @Prop()
  totalQuantity: number;

  @ApiProperty({
    enum: [
      'user-ordered-store-pending',
      'store-accepted-driver-pending',
      'driver-accepted-store-preparing',
      'store-prepared-waiting-driver',
      'driver-delivering-user-waiting',
      'driver-delivered-order-finished',
    ],
  })
  @Prop({
    enum: [
      'user-ordered-store-pending',
      'store-accepted-driver-pending',
      'driver-accepted-store-preparing',
      'store-prepared-waiting-driver',
      'driver-delivering-user-waiting',
      'driver-delivered-order-finished',
    ],
  })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
