import { Prop } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

//@Schema()
export class Point {
  @ApiPropertyOptional({ type: String, enum: ['Point'] })
  @Prop({ enum: ['Point'], default: 'Point' })
  type: string;

  @ApiPropertyOptional({
    type: [Number],
    isArray: true,
    minItems: 2,
    maxItems: 2,
  })
  @Prop()
  coordinates: number[];
}
