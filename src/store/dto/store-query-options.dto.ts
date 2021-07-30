/**
 * addition on DTO for Get requests of Store. (Query()).
 * allows filtering by equality of any of Store class' properties,
 * as well as pagination options,
 * language,
 * and more.
 */

import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { PaginationOptions } from 'src/utils/classes/paginate-options.class';

import { Type, Transform } from 'class-transformer';
import { Store } from '../schemas/store.schema';

export class StoreQueryOptions extends PartialType(Store) {
  @ApiPropertyOptional()
  @Type(() => PaginationOptions) // form class-transformer @Transform to run.
  paginationOptions: PaginationOptions;

  @ApiPropertyOptional()
  sortField?: string;
}
