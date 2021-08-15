import { IsMongoId, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class idInput {
  @IsMongoId()
  @ApiProperty()
  id: string;
}
