import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './schemas/item.schema';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role } from 'src/utils/enums/role.enum';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Roles(Role.All)
  @ApiBearerAuth()
  @Post()
  create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return this.itemService.create(createItemDto);
  }

  @Roles(Role.All)
  @ApiBearerAuth()
  @Get()
  findAll(): Promise<Item[]> {
    return this.itemService.findAll();
  }

  @Roles(Role.All)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Item> {
    return this.itemService.findOne(id);
  }

  @Roles(Role.All)
  @ApiBearerAuth()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
  ): Promise<Item> {
    return this.itemService.update(id, updateItemDto);
  }

  @Roles(Role.All)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemService.remove(id);
  }
}
