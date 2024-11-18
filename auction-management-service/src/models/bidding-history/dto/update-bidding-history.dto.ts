import { PartialType } from '@nestjs/mapped-types';
import { CreateBiddingHistoryDto } from './create-bidding-history.dto';

export class UpdateBiddingHistoryDto extends PartialType(CreateBiddingHistoryDto) {}
