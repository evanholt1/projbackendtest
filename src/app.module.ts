import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './category/category.module';
import { ItemModule } from './item/item.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/ecommerce'),
    StoreModule,
    CategoryModule,
    ItemModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
