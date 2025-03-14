import { Module } from '@nestjs/common';
import { AuctionUsersService } from './auction-users.service';
import { AuctionUsersController } from './auction-users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionUser } from './entities/auction-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuctionUser]),
  ],
  controllers: [AuctionUsersController],
  providers: [AuctionUsersService],
})
export class AuctionUsersModule { }
