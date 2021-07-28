import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { LandingCardService } from './landing-card.service';
import { CreateLandingCardDto } from './dto/create-landing-card.dto';
import { ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/utils/decorators/public-route.decorator';
import { Language } from '../utils/enums/languages.enum';
import { UpdateLandingCardDto } from './dto/update-landing-card.dto';
import { LandingCard } from './schemas/landing-card.schema';
import { LocalizedText } from '../utils/schemas/localized-text.schema';
import { Order } from '../order/schemas/order.schema';

@Controller('landing-card')
@ApiTags('Landing-Card')
export class LandingCardController {
  constructor(private readonly landingCardService: LandingCardService) {}

  @Post()
  @Public()
  create(@Body() createLandingCardDto: CreateLandingCardDto) {
    return this.landingCardService.create(createLandingCardDto);
  }

  @Public()
  @ApiQuery({ name: 'language', enum: Language, required: false })
  @Get()
  findAll(@Query('language') language: Language) {
    return this.landingCardService.findAll(language);
  }

  @Public()
  @ApiQuery({ name: 'language', enum: Language, required: false })
  @Get('random')
  findRandom(
    @Query('count') count: number,
    @Query('language') language: Language,
  ) {
    return this.landingCardService.findRandom(count, language);
  }

  @Public()
  @Get(':id')
  @ApiQuery({ name: 'language', enum: Language })
  findOne(
    @Param('id') id: string,
    @Query('language') language: Language = Language.en,
  ) {
    return this.landingCardService.findOne(id, language);
  }

  @Public()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLandingCardDto: UpdateLandingCardDto,
  ) {
    return this.landingCardService.update(id, updateLandingCardDto);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.landingCardService.remove(id);
  }

  @Post('test')
  testPost(@Body() body: LandingCard) {
    // dummy route just to use Landing Card class as to generate it in swagger.
    return 'null';
  }
}
