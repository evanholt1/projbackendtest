import { Prop } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

//@Schema()
export class Point {
  @ApiPropertyOptional({ type: String, enum: ['Point'] })
  @Prop({ enum: ['Point'] })
  type: string;

  @ApiPropertyOptional()
  @Prop()
  coordinates: number[];
}
