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
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/user/decorators/roles.decorator';
import { Public } from 'src/utils/decorators/public-route.decorator';
import { Role } from 'src/utils/enums/role.enum';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Language } from '../utils/enums/languages.enum';
import { idInput } from '../utils/classes/idInput.class';

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

  // @Roles(Role.All)
  // @ApiBearerAuth()
  @Public()
  @ApiQuery({ name: 'language', enum: Language, required: false })
  //@PaginationOptionsDecorator('paginationOptions', PaginationOptions)
  @Get()
  findAll(
    @Query('language') language: Language,
    //@Query('paginationOptions') paginationOptions: PaginationOptions,
  ) {
    return this.categoryService.findAll(language);
  }

  @Public()
  @ApiQuery({ name: 'language', enum: Language, required: false })
  @Get('/withItems')
  findWithItems(@Query('language') language: Language) {
    return this.categoryService.findWithItems(language);
  }

  // @Roles(Role.All)
  // @ApiBearerAuth()
  @Public()
  @Get(':id')
  findOne(@Param() idInput: idInput) {
    return this.categoryService.findOne(idInput.id);
  }

  // @Roles(Role.All)
  // @ApiBearerAuth()
  @Public()
  @Patch(':id')
  update(
    @Param() idInput: idInput,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(idInput.id, updateCategoryDto);
  }

  // @Roles(Role.All)
  // @ApiBearerAuth()
  @Public()
  @Delete(':id')
  remove(@Param() idInput: idInput) {
    return this.categoryService.remove(idInput.id);
  }

  // @Roles(Role.All)
  // @ApiBearerAuth()
  @Public()
  @ApiQuery({ name: 'language', enum: Language, required: false })
  @Get(':id/items')
  findOneCatItems(
    @Param() idInput: idInput,
    @Query('language') language: Language,
  ) {
    return this.categoryService.findOneCatItems(idInput.id, language);
  }
}
