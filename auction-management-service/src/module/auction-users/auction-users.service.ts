import { Injectable } from '@nestjs/common';
import { CreateAuctionUserDto } from './dto/create-auction-user.dto';
import { UpdateAuctionUserDto } from './dto/update-auction-user.dto';

@Injectable()
export class AuctionUsersService {
  create(createAuctionUserDto: CreateAuctionUserDto) {
    return 'This action adds a new auctionUser';
  }

  findAll() {
    return `This action returns all auctionUsers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auctionUser`;
  }

  update(id: number, updateAuctionUserDto: UpdateAuctionUserDto) {
    return `This action updates a #${id} auctionUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} auctionUser`;
  }
}
