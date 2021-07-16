import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PaginateOptions {
  constructor({page = 1, limit = 10, pagination = true}) {
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
  /* If pagination is set to `false`, it will return all docs without adding limit condition. (Default: `true`) */
  @ApiPropertyOptional({ default: true })
  pagination?: boolean | undefined = true;
  projection?: any;
}
