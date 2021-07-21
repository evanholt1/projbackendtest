import { PartialType } from '@nestjs/swagger';
import { CreateLandingCardDto } from './create-landing-card.dto';

export class UpdateLandingCardDto extends PartialType(CreateLandingCardDto) {}
