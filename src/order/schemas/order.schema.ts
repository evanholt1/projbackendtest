import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/schemas/user.schema';
import { OrderItem } from './order-item.schema';
import { Schema as MongooseSchema, SchemaTypes, Types } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @ApiProperty({ type: String })
  _id: MongooseSchema.Types.ObjectId;

  @ApiProperty({ type: String })
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  // @ApiProperty({ type: [String], isArray: true })
  // @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }])
  // items: Item[];
  @Prop()
  items: OrderItem[];

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
    default: 'user-ordered-store-pending',
  })
  status: string;

  @Prop({ default: false })
  reviewed: boolean;

  @Prop({ min: 0.0, max: 5.0 })
  review: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
