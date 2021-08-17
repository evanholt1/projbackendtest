import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AddonOption } from './addonOption.schema';
import { ApiProperty } from '@nestjs/swagger';
import { LocalizedText } from '../../utils/schemas/localized-text.schema';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ _id: true })
export class AddonCategory {
  @ApiProperty({ type: String })
  _id: MongooseSchema.Types.ObjectId;

  @ApiProperty({ name: 'name', type: Object })
  @Prop()
  name: LocalizedText;

  @Prop()
  min_selection: number;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore

  @Prop({
    validate: function (val) {
      return !this.options || this.options.length == 0
        ? 0
        : // @ts-ignore
          val <= this.options.length;
    },
  })
  max_selection: number;

  @Prop([AddonOption])
  options: AddonOption[];
}

//const AddonCategorySchema = MongooseSchema.cre;
