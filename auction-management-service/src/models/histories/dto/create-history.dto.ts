
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateHistoryDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  bidHistoryId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  billId: number;
}


