import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { truncate } from 'fs';
import { Document, Schema as schema, Types } from 'mongoose';
import { Role } from 'src/utils/enums/role.enum';
import { Store } from '../../store/schemas/store.schema';

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

  @Prop({ type: schema.Types.ObjectId, ref: 'Store' })
  favouriteStores: Store[];
}

export const UserSchema = SchemaFactory.createForClass(User);
