import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { Store, StoreSchema } from './schemas/store.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from 'src/item/schemas/item.schema';
import { ItemModule } from 'src/item/item.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
    // MongooseModule.forFeatureAsync([
    //   {
    //     name: Store.name,
    //     useFactory: () => {
    //       const schema = StoreSchema;
    //       schema.plugin(require('mongoose-paginate-v2'));
    //       return schema;
    //     },
    //   },
    // ]),
    ItemModule,
    UserModule,
  ],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
