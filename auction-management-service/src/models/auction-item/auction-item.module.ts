import { Module } from '@nestjs/common';
import { AuctionItemService } from './auction-item.service';
import { AuctionItemController } from './auction-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionItem } from './entities/auction-item.entity';
import { AuctionSessionModule } from '../auction-session/auction-session.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuctionItem]),
    AuctionSessionModule
  ],
  controllers: [AuctionItemController],
  providers: [AuctionItemService],
  exports: [AuctionItemService]
})
export class AuctionItemModule { }
