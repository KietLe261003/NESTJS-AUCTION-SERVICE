import { Module } from '@nestjs/common';
import { AuctionSessionHistoryService } from './auction-session-history.service';
import { AuctionSessionHistoryController } from './auction-session-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionSessionHistory } from './entities/auction-session-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuctionSessionHistory])],
  controllers: [AuctionSessionHistoryController],
  providers: [AuctionSessionHistoryService],
})
export class AuctionSessionHistoryModule { }
