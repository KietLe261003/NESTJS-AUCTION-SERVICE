import { Module } from '@nestjs/common';
import { AuctionSessionService } from './auction-session.service';
import { AuctionSessionController } from './auction-session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionSession } from './entities/auction-session.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuctionSession])
  ],
  controllers: [AuctionSessionController],
  providers: [AuctionSessionService],
  exports: [AuctionSessionService]
})
export class AuctionSessionModule { }
