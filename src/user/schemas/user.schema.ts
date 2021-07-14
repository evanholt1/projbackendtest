import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { truncate } from 'fs';
import { Document, Types } from 'mongoose';

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

  @Prop({ enum: ['user', 'driver', 'restaurant', 'admin'] })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
