import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateAuctionItemDto {

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  auctionSessionId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  assetId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  startingBids: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  bidIncrement: number;
}
