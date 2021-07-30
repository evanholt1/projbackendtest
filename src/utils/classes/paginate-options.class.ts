/**
 * Class defiend to define the structure of the .paginate() function's options (2nd parameter).
 * this is used by the package 'mongoose-paginate-v2'.
 * most useful properties are: limit, page, pagination.
 */

import { ApiPropertyOptional } from '@nestjs/swagger';
import { ToBoolean } from '../decorators/to-boolean.decorator';

export class PaginationOptions {
  constructor({
    page,
    limit,
    pagination,
  }: { page?: number; limit?: number; pagination?: boolean } = {}) {
    this.page = page;
    this.limit = limit;
    this.pagination = pagination;
  }

  select?: object | string | undefined;
  sort?: object | string | undefined;
  populate?: object[] | string[] | object | string | undefined;
  lean?: boolean | undefined;
  leanWithId?: boolean | undefined;
  offset?: number | undefined;
  @ApiPropertyOptional({ default: 1 })
  page?: number | undefined;
  @ApiPropertyOptional({ default: 10 })
  limit?: number | undefined;
  /** If pagination is set to `false`, it will return all docs without adding limit condition. (Default: `true`)
   * Note that the structure will still be the SAME ('docs' key and other keys).
   */
  @ToBoolean()
  @ApiPropertyOptional({ default: true })
  pagination?: boolean | undefined;
  projection?: any;
}
