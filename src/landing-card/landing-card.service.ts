import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLandingCardDto } from './dto/create-landing-card.dto';
import { UpdateLandingCardDto } from './dto/update-landing-card.dto';
import {
  LandingCard,
  LandingCardDocument,
} from './schemas/landing-card.schema';

@Injectable()
export class LandingCardService {
  constructor(
    @InjectModel(LandingCard.name)
    private readonly landingCardModel: Model<LandingCardDocument>,
  ) {}
  create(createLandingCardDto: CreateLandingCardDto) {
    return this.landingCardModel.create(createLandingCardDto);
  }

  findAll() {
    return this.landingCardModel.find();
  }

  findRandom(size: Number) {
    return this.landingCardModel.aggregate([{ $sample: { size: size } }]);
  }

  findOne(id: number) {
    return `This action returns a #${id} landingCard`;
  }

  update(id: number, updateLandingCardDto: UpdateLandingCardDto) {
    return `This action updates a #${id} landingCard`;
  }

  remove(id: number) {
    return `This action removes a #${id} landingCard`;
  }
}
