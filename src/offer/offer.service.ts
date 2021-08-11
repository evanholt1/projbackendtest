import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Offer, OfferDocument } from './schemas/offer.schema';
import { FilterQuery, Schema, Types } from 'mongoose';
import {
  Category,
  CategoryDocument,
} from '../category/schemas/category.schema';
import { Item, ItemDocument } from '../item/schemas/item.schema';

@Injectable()
export class OfferService {
  constructor(
    @InjectModel(Offer.name)
    private offerModel: mongoose.Model<OfferDocument>,
    @InjectModel(Item.name)
    private itemModel: mongoose.Model<ItemDocument>,
  ) {}
  async create(createOfferDto: CreateOfferDto) {
    this.throwIfOfferAffectsBothCategoriesAndItems(
      createOfferDto.affectedCategories,
      createOfferDto.affectedItems,
    );
    this.throwIfOfferAffectsNeitherCategoriesAndItems(
      createOfferDto.affectedCategories,
      createOfferDto.affectedItems,
    );

    if (createOfferDto.affectedCategories)
      this.throwIfExistingOfferAffectsACategory(createOfferDto);
    else this.throwIfExistingOfferAffectsAnItem(createOfferDto);

    let isActivePromise = null;

    if (createOfferDto.isActive && createOfferDto.affectedCategories)
      isActivePromise = this.itemModel
        .find({
          store: createOfferDto.affectedStore,
          category: { $in: createOfferDto.affectedCategories },
        } as FilterQuery<Category>)
        .exec()
        .then((items) =>
          Promise.all(
            items.map((item: ItemDocument) => {
              item.price_discount_percentage = createOfferDto.discountValue;
              return item.save();
            }),
          ),
        );
    else if (createOfferDto.isActive && createOfferDto.affectedItems)
      isActivePromise = this.itemModel
        .find({
          store: createOfferDto.affectedStore,
          _id: { $in: createOfferDto.affectedItems },
        } as unknown)
        .exec()
        .then((items) =>
          Promise.all(
            items.map((item: ItemDocument) => {
              item.price_discount_percentage = createOfferDto.discountValue;
              return item.save();
            }),
          ),
        );
    return Promise.all([
      this.offerModel.create(createOfferDto),
      isActivePromise,
    ]);
  }

  findAll() {
    return this.offerModel.find().exec();
  }

  findOne(id: number) {
    return this.offerModel.findById(id).exec();
  }

  async update(id: number, updateOfferDto: UpdateOfferDto) {
    this.throwIfOfferAffectsBothCategoriesAndItems(
      updateOfferDto.affectedCategories,
      updateOfferDto.affectedItems,
    );
    this.throwIfOfferAffectsNeitherCategoriesAndItems(
      updateOfferDto.affectedCategories,
      updateOfferDto.affectedItems,
    );

    if (updateOfferDto.affectedCategories) {
      const affectedCategories: Types.ObjectId[] =
        updateOfferDto.affectedCategories.map(
          (catId) => new Types.ObjectId(catId),
        );
      // @ts-ignore
      const updatedCategories: {
        _id: Types.ObjectId;
        addedCats: Types.ObjectId[];
        removedCats: Types.ObjectId[];
      } = await this.offerModel.aggregate([
        {
          $project: {
            addedCats: {
              $setDifference: [affectedCategories, '$affectedCategories'],
            },
            removedCats: {
              $setDifference: ['$affectedCategories', affectedCategories],
            },
          },
        },
      ]);
      this.throwIfExistingOfferAffectsACategory(updatedCategories.addedCats);
    }
  }

  remove(id: number) {
    return this.offerModel.deleteOne({ _id: id }).exec();
  }

  throwIfOfferAffectsBothCategoriesAndItems(affectedCategories, affectedItems) {
    if (affectedCategories?.length && affectedItems?.length)
      throw new HttpException(
        'Cannot affect categories & items at the same time',
        HttpStatus.BAD_REQUEST,
      );
  }

  private throwIfOfferAffectsNeitherCategoriesAndItems(
    affectedCategories,
    affectedItems,
  ) {
    if (
      (!affectedCategories || affectedCategories.length == 0) &&
      (!affectedItems || affectedItems.length == 0)
    )
      throw new HttpException(
        'Offer must affect either categories or items',
        HttpStatus.BAD_REQUEST,
      );
  }

  private throwIfExistingOfferAffectsACategory(affectedCategories) {
    this.offerModel
      .findOne({
        affectedCategories: { $in: affectedCategories },
      } as FilterQuery<Category>)
      .exec()
      .then((doc) => {
        if (doc)
          throw new HttpException(
            `offer ${doc._id} already affects a category of this new offer!`,
            HttpStatus.CONFLICT,
          );
      });
  }
  private throwIfExistingOfferAffectsAnItem(affectedItems) {
    this.offerModel
      .findOne({
        affectedItems: { $in: affectedItems },
      } as FilterQuery<Item>)
      .exec()
      .then((doc) => {
        if (doc)
          throw new HttpException(
            `offer ${doc._id} already affects Item of this new offer!`,
            HttpStatus.CONFLICT,
          );
      });
  }

  private async throwIfNewOfferAffectedCategoriesWillBreakAnAffectedItemsOffer(
    affectedCategories,
  ) {
    const results = await this.offerModel.aggregate([
      {
        $match: {
          isActive: true,
          affectedItems: { $exists: true, $not: { $size: 0 } },
        },
      },
      {
        $lookup: {
          from: 'items',
          let: { affectedItems: '$affectedItems' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $in: ['$_id', '$$affectedItems'] },
                    { $in: ['$category', affectedCategories] },
                  ],
                },
              },
            },
            {
              $project: {
                _id: 1,
              },
            },
          ],
          as: 'affectedItems',
        },
      },
    ]);
    results.forEach((result) => {
      if (result.affectedItems > 0)
        throw new HttpException(`offer`, HttpStatus.CONFLICT);
    });
  }
}
