import { Test, TestingModule } from '@nestjs/testing';
import { AuctionSessionService } from './auction-session.service';

describe('AuctionSessionService', () => {
  let service: AuctionSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuctionSessionService],
    }).compile();

    service = module.get<AuctionSessionService>(AuctionSessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
