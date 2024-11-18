import { Module } from '@nestjs/common';
import { HistoriesService } from './histories.service';
import { HistoriesController } from './histories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from './entities/history.entity';
import { BiddingHistoryModule } from '../bidding-history/bidding-history.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([History]),
    BiddingHistoryModule
  ],
  controllers: [HistoriesController],
  providers: [HistoriesService],
})
export class HistoriesModule { }
