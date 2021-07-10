import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { Store, StoreSchema } from './schemas/store.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from 'src/item/schemas/item.schema';
import { ItemModule } from 'src/item/item.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
    ItemModule,
    AuthModule,
  ],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
