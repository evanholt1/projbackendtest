/**
 * addition on DTO for Get requests of Store. (Query()).
 * allows filtering by equality of any of Store class' properties,
 * as well as pagination options,
 * language,
 * and more.
 */

import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { PaginateOptions } from 'src/utils/classes/paginate-options.class';

import { Type, Transform } from 'class-transformer';
import { Store } from '../schemas/store.schema';
import { Language } from 'src/utils/enums/languages.enum';

export class StoreQueryOptions extends PartialType(Store) {
  //@ApiPropertyOptional({ type: () => PaginateOptions })
  @ApiPropertyOptional()
  @Type(() => PaginateOptions) // form class-transformer @Transform to run.
  paginationOptions: PaginateOptions;

  // @ApiProperty({ default: 'en', type: () => Language })
  // @Transform(({ value }) => (value === 'en' ? Language.en : Language.ar))
  // language: Language;

  @ApiPropertyOptional()
  sortField?: string;
}
