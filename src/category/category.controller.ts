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
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/user/decorators/roles.decorator';
import { Public } from 'src/utils/decorators/public-route.decorator';
import { Role } from 'src/utils/enums/role.enum';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Language } from '../utils/enums/languages.enum';
import { PaginationOptions } from '../utils/classes/paginate-options.class';
import { PaginationOptionsDecorator } from '../utils/decorators/pagination-options.decorator';
import { StoreType } from '../utils/enums/store-type.enum';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // @Roles(Role.All)
  // @ApiBearerAuth()
  @Public()
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  // @Public()
  // @Get('/localize')
  // localize() {
  //   return this.categoryService.localize();
  // }

  // @Roles(Role.All)
  // @ApiBearerAuth()
  @Public()
  @ApiQuery({ name: 'language', enum: Language, required: false })
  @ApiQuery({ name: 'storeType', enum: StoreType, required: false })
  @PaginationOptionsDecorator('paginationOptions', PaginationOptions)
  @Get()
  findAll(
    @Query('language') language: Language,
    @Query('paginationOptions') paginationOptions: PaginationOptions,
    @Query('storeType') storeType: StoreType,
  ) {
    return this.categoryService.findAll(language, paginationOptions, storeType);
  }

  // @Roles(Role.All)
  // @ApiBearerAuth()
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  // @Roles(Role.All)
  // @ApiBearerAuth()
  @Public()
  @ApiQuery({ name: 'language', enum: Language, required: false })
  @PaginationOptionsDecorator('paginationOptions', PaginationOptions)
  @Get(':id/items')
  findOneCatItems(
    @Param('id') id: string,
    @Query('language') language: Language,
    @Query('paginationOptions') paginationOptions: PaginationOptions,
  ) {
    return this.categoryService.findOneCatItems(
      id,
      language,
      paginationOptions,
    );
  }

  @Roles(Role.All)
  @ApiBearerAuth()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Roles(Role.All)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
