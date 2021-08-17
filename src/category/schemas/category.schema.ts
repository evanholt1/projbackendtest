import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Item } from 'src/item/schemas/item.schema';
import { LocalizedText } from '../../utils/schemas/localized-text.schema';

export type CategoryDocument = Category & Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Category extends Document {
  @ApiProperty({ type: String })
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  name: LocalizedText;

  @Prop()
  icon_url: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

// will not work. f nest
CategorySchema.virtual('items', {
  ref: 'items',
  localField: '_id',
  foreignField: 'category',
});
