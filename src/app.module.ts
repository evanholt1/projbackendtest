import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './category/category.module';
import { ItemModule } from './item/item.module';
import { StoreModule } from './store/store.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './user/guards/jwt-auth.guard';
import { RolesGuard } from './user/guards/roles.guard';
import { Connection } from 'mongoose';
import { LandingCardModule } from './landing-card/landing-card.module';
import { SocketModule } from './socket/socket.module';
import { OfferModule } from './offer/offer.module';
import * as paginatePlugin from 'mongoose-paginate-v2';
import * as aggregatePaginatePlugin from 'mongoose-aggregate-paginate-v2';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb+srv://evan:${configService.get(
          'mongo_cloud_pass',
        )}@ecommerce.meizb.mongodb.net/bigmart?retryWrites=true&w=majority`,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true,
        connectionFactory: (connection) => {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          connection.plugin(paginatePlugin);
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          connection.plugin(aggregatePaginatePlugin);
          return connection;
        },
      }),

      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    StoreModule,
    CategoryModule,
    ItemModule,
    UserModule,
    OrderModule,
    LandingCardModule,
    SocketModule,
    OfferModule,
    // AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      // note this in documentation may need to be defined in Auth module instead.
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
