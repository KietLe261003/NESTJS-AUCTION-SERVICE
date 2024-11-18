import { Test, TestingModule } from '@nestjs/testing';
import { AuctionSessionController } from './auction-session.controller';
import { AuctionSessionService } from './auction-session.service';

describe('AuctionSessionController', () => {
  let controller: AuctionSessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuctionSessionController],
      providers: [AuctionSessionService],
    }).compile();

    controller = module.get<AuctionSessionController>(AuctionSessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
