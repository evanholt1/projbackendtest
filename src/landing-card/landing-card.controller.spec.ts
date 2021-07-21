import { Test, TestingModule } from '@nestjs/testing';
import { LandingCardController } from './landing-card.controller';
import { LandingCardService } from './landing-card.service';

describe('LandingCardController', () => {
  let controller: LandingCardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LandingCardController],
      providers: [LandingCardService],
    }).compile();

    controller = module.get<LandingCardController>(LandingCardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
