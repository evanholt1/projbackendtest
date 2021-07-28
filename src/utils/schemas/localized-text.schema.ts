import { ApiPropertyOptional } from '@nestjs/swagger';

export class LocalizedText {
  @ApiPropertyOptional()
  en: string;
  @ApiPropertyOptional()
  ar: string;
}
