import { Test, TestingModule } from '@nestjs/testing';
import { BiddingHistoryController } from './bidding-history.controller';
import { BiddingHistoryService } from './bidding-history.service';

describe('BiddingHistoryController', () => {
  let controller: BiddingHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BiddingHistoryController],
      providers: [BiddingHistoryService],
    }).compile();

    controller = module.get<BiddingHistoryController>(BiddingHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
