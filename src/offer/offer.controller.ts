import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OfferService } from './offer.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { ApiTags } from '@nestjs/swagger';
import { Offer } from './schemas/offer.schema';
import { Public } from '../utils/decorators/public-route.decorator';

@Controller('offer')
@ApiTags('Offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Public()
  @Post()
  create(@Body() createOfferDto: CreateOfferDto) {
    return this.offerService.create(createOfferDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.offerService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offerService.findOne(+id);
  }

  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOfferDto: UpdateOfferDto) {
    return this.offerService.update(+id, updateOfferDto);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.offerService.remove(+id);
  }

  @Post('/dummy')
  dummy(@Body() offer: Offer) {
    return 'true';
  }
}
