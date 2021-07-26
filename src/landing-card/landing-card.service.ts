import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLandingCardDto } from './dto/create-landing-card.dto';
import { UpdateLandingCardDto } from './dto/update-landing-card.dto';
import {
  LandingCard,
  LandingCardDocument,
} from './schemas/landing-card.schema';
import { Language } from "../utils/enums/languages.enum";

@Injectable()
export class LandingCardService {
  constructor(
    @InjectModel(LandingCard.name)
    private readonly landingCardModel: Model<LandingCardDocument>,
  ) {}
  create(createLandingCardDto: CreateLandingCardDto) {
    return this.landingCardModel.create(createLandingCardDto);
  }

  findAll(language: Language) {
    return this.landingCardModel.find(
      {},
      this.removeOtherLocalesFieldsFromProjection(language),
    );
  }

  findRandom(size: number, language: Language) {
    return this.landingCardModel.aggregate([
      { $sample: { size: size } },
      { $project: this.removeOtherLocalesFieldsFromProjection(language) },
    ]);
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

  removeOtherLocalesFieldsFromProjection(language: Language) {
    return language === Language.en
      ? { title_ar: 0, subtitle_ar: 0, body_ar: 0 }
      : { title_en: 0, subtitle_en: 0, body_en: 0 };
  }
}
