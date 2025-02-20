import { Test, TestingModule } from '@nestjs/testing';
import { AuctionSessionHistoryController } from './auction-session-history.controller';
import { AuctionSessionHistoryService } from './auction-session-history.service';

describe('AuctionSessionHistoryController', () => {
  let controller: AuctionSessionHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuctionSessionHistoryController],
      providers: [AuctionSessionHistoryService],
    }).compile();

    controller = module.get<AuctionSessionHistoryController>(AuctionSessionHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
