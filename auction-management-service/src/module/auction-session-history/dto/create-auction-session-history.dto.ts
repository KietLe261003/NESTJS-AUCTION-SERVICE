
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateAuctionSessionHistoryDto {
  @ApiProperty({
    example: 1,
    description: "ID của phiên đấu giá",
  })
  @IsNotEmpty()
  @IsNumber()
  auctionSessionId: number;

  @ApiProperty({
    example: 1001,
    description: "ID của người đặt giá",
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({
    example: 5000000,
    description: "Số tiền đặt giá",
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  bidAmount: number;
}

