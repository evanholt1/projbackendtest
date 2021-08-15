import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, MinLength } from 'class-validator';

export class LocalizedText {
  @ApiPropertyOptional()
  @IsString()
  @MinLength(1)
  en: string;

  @ApiPropertyOptional()
  @IsString()
  @MinLength(1)
  ar: string;
}
