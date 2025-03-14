import { Test, TestingModule } from '@nestjs/testing';
import { AuctionUsersService } from './auction-users.service';

describe('AuctionUsersService', () => {
  let service: AuctionUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuctionUsersService],
    }).compile();

    service = module.get<AuctionUsersService>(AuctionUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
