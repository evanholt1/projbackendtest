import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { PaginateOptions } from 'src/utils/classes/paginate-options.class';
import { Language } from 'src/utils/enums/languages.enum';
import { StoreType } from 'src/utils/enums/store-type.enum';
import { Point } from 'src/utils/schemas/point.schema';

export class FindStoresWithCategoryItemsQueryParamsDto {
  @ApiPropertyOptional()
  @Type(() => PaginateOptions)
  paginationOptions: PaginateOptions;

  @ApiProperty({ default: 'en', type: () => Language })
  @Transform(({ value }) => (value === 'en' ? Language.en : Language.ar))
  language: Language;

  categoryId: string;

  @ApiProperty({
    type: () => StoreType,
    enum: Object.keys(StoreType).filter((key) => Number.isNaN(parseInt(key))),
  })
  storeType: StoreType;
}
