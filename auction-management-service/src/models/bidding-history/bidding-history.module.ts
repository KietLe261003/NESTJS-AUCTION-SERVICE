import { Module } from '@nestjs/common';
import { BiddingHistoryService } from './bidding-history.service';
import { BiddingHistoryController } from './bidding-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BiddingHistory } from './entities/bidding-history.entity';
import { AuctionItemModule } from '../auction-item/auction-item.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BiddingHistory]),
    AuctionItemModule
  ],
  controllers: [BiddingHistoryController],
  providers: [BiddingHistoryService],
  exports: [BiddingHistoryService]
})
export class BiddingHistoryModule { }
