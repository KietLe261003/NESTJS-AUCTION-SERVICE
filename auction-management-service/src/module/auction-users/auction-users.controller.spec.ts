import { Test, TestingModule } from '@nestjs/testing';
import { AuctionUsersController } from './auction-users.controller';
import { AuctionUsersService } from './auction-users.service';

describe('AuctionUsersController', () => {
  let controller: AuctionUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuctionUsersController],
      providers: [AuctionUsersService],
    }).compile();

    controller = module.get<AuctionUsersController>(AuctionUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
