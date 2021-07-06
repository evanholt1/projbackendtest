import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './category/category.module';
import { ItemModule } from './item/item.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb+srv://evan:${configService.get(
          'mongo_cloud_pass',
        )}@mern.xupmz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    StoreModule,
    CategoryModule,
    ItemModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
