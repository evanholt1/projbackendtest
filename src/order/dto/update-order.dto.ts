import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import mongoose from 'mongoose';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
