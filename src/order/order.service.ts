import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import * as mongoose from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery } from 'mongoose';
import { from, fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item, ItemDocument } from '../item/schemas/item.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: mongoose.Model<OrderDocument>,
    @InjectModel(Item.name)
    private readonly itemModel: mongoose.Model<ItemDocument>,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const items = await this.itemModel
      .find({ _id: { $in: createOrderDto.items } })
      .exec();
    const itemUpdates = items.map((item) => {
      item.salesCount++;
      return item.save();
    });
    return Promise.all([itemUpdates, this.orderModel.create(createOrderDto)]);
  }

  findAll() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return this.orderModel.paginate();
  }

  findOne(id: string) {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);

    return this.orderModel.findById(id).exec();
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);

    const store = await this.orderModel.findById(id).exec();
    store.set(updateOrderDto);
    return store.save();
  }

  remove(id: string) {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);

    return this.orderModel
      .deleteOne({ _id: id } as FilterQuery<OrderDocument>)
      .exec();
  }
}
