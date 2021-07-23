import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LandingCardService } from './landing-card.service';
import { CreateLandingCardDto } from './dto/create-landing-card.dto';
import { UpdateLandingCardDto } from './dto/update-landing-card.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/utils/decorators/public-route.decorator';

@Controller('landing-card')
@ApiTags('Landing-Card')
export class LandingCardController {
  constructor(private readonly landingCardService: LandingCardService) {}

  @Post()
  @Public()
  create(@Body() createLandingCardDto: CreateLandingCardDto) {
    return this.landingCardService.create(createLandingCardDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.landingCardService.findAll();
  }

  @Get('random')
  @Public()
  findRandom(@Query('count') count: Number) {
    return this.landingCardService.findRandom(count);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.landingCardService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLandingCardDto: UpdateLandingCardDto) {
  //   return this.landingCardService.update(id, updateLandingCardDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.landingCardService.remove(id);
  // }
}
