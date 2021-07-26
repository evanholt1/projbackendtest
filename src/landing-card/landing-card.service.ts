import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLandingCardDto } from './dto/create-landing-card.dto';
import { UpdateLandingCardDto } from './dto/update-landing-card.dto';
import {
  LandingCard,
  LandingCardDocument,
} from './schemas/landing-card.schema';
import { Language } from '../utils/enums/languages.enum';
import { isValidObjectId } from 'mongoose';

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
    return this.landingCardModel.find({}, this.projectByLang(language));
  }

  findRandom(size: number, language: Language) {
    return this.landingCardModel.aggregate([
      { $sample: { size: size } },
      { $project: this.projectByLang(language) },
    ]);
  }

  findOne(id: string, language: Language) {
    if (!isValidObjectId(id))
      throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);

    return this.landingCardModel.findById(id, this.projectByLang(language));
  }

  async update(id: string, updateLandingCardDto: UpdateLandingCardDto) {
    if (!isValidObjectId(id))
      throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);

    const landingCard = await this.landingCardModel.findById(id).exec();

    landingCard.set(updateLandingCardDto);

    return landingCard.save();
  }

  remove(id: string) {
    if (!isValidObjectId(id))
      throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);

    return this.landingCardModel.deleteOne({ _id: id }).exec();
  }

  projectByLang(language: Language) {
    return language === Language.en
      ? { title_ar: 0, subtitle_ar: 0, body_ar: 0 }
      : { title_en: 0, subtitle_en: 0, body_en: 0 };
  }
}
