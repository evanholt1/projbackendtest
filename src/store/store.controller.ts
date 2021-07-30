import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/user/decorators/roles.decorator';
import { Role } from 'src/utils/enums/role.enum';
import { Public } from 'src/utils/decorators/public-route.decorator';
import { StoreQueryOptions } from './dto/store-query-options.dto';
import { PaginationOptions } from 'src/utils/classes/paginate-options.class';
import { PaginationOptionsDecorator } from 'src/utils/decorators/pagination-options.decorator';
import { FindStoresWithCategoryItemsQueryParamsDto } from './dto/store-with-cat-items.dto';
import { Language } from '../utils/enums/languages.enum';

@Controller('store')
@ApiTags('Store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Roles(Role.All)
  @ApiBearerAuth()
  @Post()
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storeService.create(createStoreDto);
  }

  @Public()
  //@ApiBearerAuth()
  @ApiQuery({ name: 'language', enum: Language, required: false })
  @Get()
  @PaginationOptionsDecorator('paginationOptions', PaginationOptions)
  findAll(
    @Query() storeQueryOptions: StoreQueryOptions,
    @Query('language') language: Language,
  ) {
    return this.storeService.findAll(storeQueryOptions, language);
  }

  // @Roles(Role.All)
  // @ApiBearerAuth()
  @Public()
  @Get(':id/items')
  findAllItems(@Param('id') id: string) {
    return this.storeService.findStoreItems(id);
  }

  @Public()
  @Get('withCategoryItems')
  @PaginationOptionsDecorator('paginationOptions', PaginationOptions)
  findStoresWithCategoryItems(
    @Query()
    findStoresWithCategoryItemsQueryParamsDto: FindStoresWithCategoryItemsQueryParamsDto,
  ) {
    return this.storeService.findStoresWithCategoryItems(
      findStoresWithCategoryItemsQueryParamsDto,
    );
  }

  // @Roles(Role.All)
  // @ApiBearerAuth()
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeService.findOne(id);
  }

  @Roles(Role.All)
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(id, updateStoreDto);
  }

  @Roles(Role.All)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeService.remove(id);
  }

  // @Post('test')
  // testPost(
  //   @Body() body: StoreQueryFiltersDto,
  //   @Query() query: StoreQueryFiltersDto,
  // ) {
  //   // dummy route just to use Order class as to generate it in swagger.
  //   return 'null';
  // }
}
