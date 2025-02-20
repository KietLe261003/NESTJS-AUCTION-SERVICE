import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateDepositDto {
  @IsNotEmpty()
  @IsNumber()
  auctionSessionId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  depositAmount: number
}
