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
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './schemas/item.schema';
import { Roles } from 'src/user/decorators/roles.decorator';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/utils/enums/role.enum';
import { Public } from 'src/utils/decorators/public-route.decorator';
import { Language } from '../utils/enums/languages.enum';
import { PaginationOptionsDecorator } from '../utils/decorators/pagination-options.decorator';
import { PaginationOptions } from '../utils/classes/paginate-options.class';

@Controller('item')
@ApiTags('Item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  // @Roles(Role.All)
  // @ApiBearerAuth()
  @Public()
  @Post()
  create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return this.itemService.create(createItemDto);
  }

  // @Roles(Role.All)
  // @ApiBearerAuth()
  @Public()
  @ApiQuery({ name: 'language', enum: Language, required: false })
  @Get()
  findAll(@Query('language') language: Language): Promise<Item[]> {
    return this.itemService.findAll(language);
  }

  // @Public()
  // @ApiQuery({ name: 'language', enum: Language, required: false })
  // @Get('storeItemsByCat/:storeId')
  // findStoreItemsByCat(
  //   @Query('language') language: Language,
  //   @Param('storeId') storeId: string,
  // ) {
  //   return this.itemService.findStoreItemsByCat(language, storeId);
  // }
  // @Roles(Role.All)
  // @ApiBearerAuth()

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Item> {
    return this.itemService.findOne(id);
  }

  // @Roles(Role.All)
  // @ApiBearerAuth()
  @Public()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
  ): Promise<Item> {
    return this.itemService.update(id, updateItemDto);
  }

  // @Roles(Role.All)
  // @ApiBearerAuth()
  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemService.remove(id);
  }
}
