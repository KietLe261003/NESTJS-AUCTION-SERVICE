import { PartialType } from '@nestjs/swagger';
import { CreateAuctionUserDto } from './create-auction-user.dto';

export class UpdateAuctionUserDto extends PartialType(CreateAuctionUserDto) {}
