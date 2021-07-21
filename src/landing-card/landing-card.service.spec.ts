import { Test, TestingModule } from '@nestjs/testing';
import { LandingCardService } from './landing-card.service';

describe('LandingCardService', () => {
  let service: LandingCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LandingCardService],
    }).compile();

    service = module.get<LandingCardService>(LandingCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
