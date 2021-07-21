import { Module } from '@nestjs/common';
import { LandingCardService } from './landing-card.service';
import { LandingCardController } from './landing-card.controller';
import { LandingCard, LandingCardSchema } from './schemas/landing-card.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LandingCard.name, schema: LandingCardSchema },
    ]),
  ],
  controllers: [LandingCardController],
  providers: [LandingCardService],
})
export class LandingCardModule {}
