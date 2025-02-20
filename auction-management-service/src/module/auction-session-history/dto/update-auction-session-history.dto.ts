import { PartialType } from '@nestjs/swagger';
import { CreateAuctionSessionHistoryDto } from './create-auction-session-history.dto';

export class UpdateAuctionSessionHistoryDto extends PartialType(CreateAuctionSessionHistoryDto) {}
