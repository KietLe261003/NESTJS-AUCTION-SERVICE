import { Test, TestingModule } from '@nestjs/testing';
import { AuctionSessionHistoryService } from './auction-session-history.service';

describe('AuctionSessionHistoryService', () => {
  let service: AuctionSessionHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuctionSessionHistoryService],
    }).compile();

    service = module.get<AuctionSessionHistoryService>(AuctionSessionHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
