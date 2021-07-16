import { Type } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { PaginateOptions } from 'src/utils/classes/paginate-options.class';

import { Store } from '../schemas/store.schema';

export class StoreQueryFiltersDto extends PartialType(Store) {
  @ApiPropertyOptional({ type: () => PaginateOptions })
  paginationOptions: PaginateOptions;
}
