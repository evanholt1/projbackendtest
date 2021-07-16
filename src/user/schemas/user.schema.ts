import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { truncate } from 'fs';
import { Document, Types } from 'mongoose';
import { Role } from 'src/utils/enums/role.enum';

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
}

export const UserSchema = SchemaFactory.createForClass(User);
