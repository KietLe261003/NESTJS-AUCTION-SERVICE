import { Test, TestingModule } from '@nestjs/testing';
import { AuctionItemService } from './auction-item.service';

describe('AuctionItemService', () => {
  let service: AuctionItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuctionItemService],
    }).compile();

    service = module.get<AuctionItemService>(AuctionItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
