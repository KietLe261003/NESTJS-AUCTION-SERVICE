
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateBiddingHistoryDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: "The ID of the auction item being bid on.",
    example: 123
  })
  auctionItemID: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: "The ID of the user placing the bid.",
    example: 456
  })
  userID: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: "The amount of the bid.",
    example: 1000
  })
  bidAmount: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: "The timestamp of the bid placement.",
    example: "2023-11-09T14:48:00.000Z",
    type: Date
  })
  bidTime: Date;
}

