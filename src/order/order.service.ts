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
    private itemService: ItemService,
  ) {}

  // weirdly done so order can be it's own full entity with names and such.
  async create(createOrderDto: CreateOrderDto) {
    const ids = createOrderDto.items.map((item) => item.item);

    const items = await this.itemModel
      //@ts-ignore
      .find({ _id: { $in: ids } })
      .exec();

    const itemIdToNameMap = {};
    const addonCatIdToNameMap = {};
    const addonOptIdToNameMap = {};
    items.forEach((item) => {
      itemIdToNameMap[item._id] = item.name;
      item.addonsByCat.forEach((cat) => {
        addonCatIdToNameMap[cat._id.toString()] = cat.name;
        cat.options.forEach((opt) => {
          addonOptIdToNameMap[opt._id.toString()] = opt.name;
        });
      });
    });

    createOrderDto.items.forEach((item) => {
      item.name = itemIdToNameMap[item.item.toString()];
      item.selectedAddonCats.forEach((cat) => {
        cat.name = addonCatIdToNameMap[cat._id.toString()];
        cat.selectedOptions.forEach((opt) => {
          opt.name = addonOptIdToNameMap[opt._id.toString()];
        });
      });
    });

    const itemUpdates = items.map((item) => {
      item.salesCount++;
      return item.save();
    });

    const p = (await Promise.all([
      itemUpdates,
      this.orderModel.create(createOrderDto),
    ])) as any;

    return p[1];
  }

  findAll(language: Language) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return this.orderModel.find(
      {},
      this.itemService.projectOrderItemsByLang(language),
    );
    // .populate({
    //   path: 'items.item',
    //   //select: this.itemService.projectByLang(language),
    // })
    // .populate('items.selectedAddonCats._id')
    // .populate('items.selectedAddonCats.selectedOptions._id');
  }

  findOne(id: string, language: Language) {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);

    return (
      this.orderModel
        .findById(id)
        // .populate({
        //   path: 'store',
        //   select:
        //     this.storeService.keepOnlyLocaleSpecificFieldsInSelection(language),
        // })
        .populate({
          path: 'items.item',
          model: 'Item',
          select: this.itemService.projectByLang(language),
        })
        .exec()
    );
  }

  findUserOrders(userId: string, language: Language) {
    return (
      this.orderModel
        .find({ user: Types.ObjectId(userId) } as FilterQuery<Order>)
        //.populate('store')
        // .populate({
        //   path: 'store',
        //   select:
        //     this.storeService.keepOnlyLocaleSpecificFieldsInSelection(language),
        // })
        .populate({
          path: 'items.item',
          select: this.itemService.projectByLang(language),
        })
        .exec()
    );
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
