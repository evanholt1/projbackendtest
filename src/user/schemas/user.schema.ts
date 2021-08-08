import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { truncate } from 'fs';
import { Document, Schema as schema, Types } from 'mongoose';
import { Role } from 'src/utils/enums/role.enum';
import { Store } from '../../store/schemas/store.schema';
import { Point } from '../../utils/schemas/point.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty({ type: String })
  _id: Types.ObjectId;

  @Prop({ unique: true })
  uuid: string;

  @Prop()
  name: string;

  @Prop()
  phone_number: string;

  @Prop()
  email: string;

  @Prop({ enum: Role })
  role: string;

  @Prop({ type: [Types.ObjectId], ref: 'Store', required: false })
  favouriteStores: Store[];

  @Prop({ default: [] })
  currentLocation: Point;

  @Prop({ default: [] })
  savedAddresses: Point[];
}

export const UserSchema = SchemaFactory.createForClass(User);
