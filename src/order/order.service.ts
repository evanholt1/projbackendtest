import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import * as mongoose from 'mongoose';
import { FilterQuery, Types } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Item, ItemDocument } from '../item/schemas/item.schema';
import { Language } from '../utils/enums/languages.enum';
import { StoreService } from '../store/store.service';
import { ItemService } from '../item/item.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: mongoose.Model<OrderDocument>,
    @InjectModel(Item.name)
    private readonly itemModel: mongoose.Model<ItemDocument>,
    private storeService: StoreService,
    private itemService: ItemService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const items = await this.itemModel
      .find({ id: { $in: createOrderDto.items } })
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
    return this.orderModel.paginate({}, { populate: 'items' });
  }

  findOne(id: string) {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);

    return this.orderModel.findById(id).exec();
  }

  findUserOrders(userId: string, language: Language) {
    return this.orderModel
      .find({ user: Types.ObjectId(userId) } as FilterQuery<Order>)
      .populate('store')
      .populate({
        path: 'store',
        select:
          this.storeService.keepOnlyLocaleSpecificFieldsInSelection(language),
      })
      .populate({
        path: 'items.item',
        select: this.itemService.projectByLang(language, false),
      })
      .exec();
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
