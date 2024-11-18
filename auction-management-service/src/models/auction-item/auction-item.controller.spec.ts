import { Test, TestingModule } from '@nestjs/testing';
import { AuctionItemController } from './auction-item.controller';
import { AuctionItemService } from './auction-item.service';

describe('AuctionItemController', () => {
  let controller: AuctionItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuctionItemController],
      providers: [AuctionItemService],
    }).compile();

    controller = module.get<AuctionItemController>(AuctionItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
