import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { LocalizedText } from '../../utils/schemas/localized-text.schema';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ _id: true })
export class AddonOption {
  @ApiProperty({ type: String })
  _id: MongooseSchema.Types.ObjectId;

  @ApiProperty({ name: 'name', type: Object })
  @Prop()
  name: LocalizedText;

  @Prop()
  price: number;
}
