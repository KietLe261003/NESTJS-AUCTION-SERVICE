import { Test, TestingModule } from '@nestjs/testing';
import { BiddingHistoryService } from './bidding-history.service';

describe('BiddingHistoryService', () => {
  let service: BiddingHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BiddingHistoryService],
    }).compile();

    service = module.get<BiddingHistoryService>(BiddingHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
