import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Item } from 'src/item/schemas/item.schema';
import { User } from 'src/user/schemas/user.schema';

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
}
