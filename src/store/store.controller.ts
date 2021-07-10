import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('store')
export class StoreController {
  constructor(
    private readonly storeService: StoreService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storeService.create(createStoreDto);
  }

  @UseGuards(JwtAuthGuard, new RolesGuard({ allowAll: true }))
  @ApiBearerAuth()
  @Get()
  findAll(@Request() req) {
    return this.storeService.findAll(req);
  }

  @Get(':id/items')
  findAllItems(@Param('id') id: string) {
    return this.storeService.findAllItems(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(id, updateStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeService.remove(id);
  }
}
