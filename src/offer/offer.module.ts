import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { CategoryModule } from '../category/category.module';
import { ItemModule } from '../item/item.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from '../category/schemas/category.schema';
import { Offer, OfferSchema } from './schemas/offer.schema';

@Module({
  controllers: [OfferController],
  providers: [OfferService],
  imports: [
    MongooseModule.forFeature([{ name: Offer.name, schema: OfferSchema }]),
    CategoryModule,
    ItemModule,
  ],
})
export class OfferModule {}
