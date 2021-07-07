import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  _id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  phone_number: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
