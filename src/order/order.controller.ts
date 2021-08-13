import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Sse,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './schemas/order.schema';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/user/decorators/roles.decorator';
import { Public } from 'src/utils/decorators/public-route.decorator';
import { interval, map, Observable } from 'rxjs';
import { Language } from '../utils/enums/languages.enum';

@Controller('order')
@ApiTags('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Public()
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Public()
  @ApiQuery({ name: 'language', enum: Language, required: false })
  @Get(':id')
  findOne(@Param('id') id: string, @Query('language') language: Language) {
    return this.orderService.findOne(id, language);
  }

  @Public()
  @ApiQuery({ name: 'language', enum: Language, required: false })
  @Get('/user/:id')
  findUserOrders(
    @Param('id') id: string,
    @Query('language') language: Language,
  ) {
    return this.orderService.findUserOrders(id, language);
  }

  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }

  @Post('test')
  testPost(@Body() body: Order) {
    // dummy route just to use Order class as to generate it in swagger.
    return 'null';
  }
}
