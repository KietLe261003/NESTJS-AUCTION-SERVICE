
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class CreateAuctionSessionDto {
  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Thời gian bắt đầu của phiên đấu giá',
    example: '2024-12-01T10:00:00Z',
    type: Date,
  })
  startTime: Date;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Thời gian kết thúc của phiên đấu giá',
    example: '2024-12-01T12:00:00Z',
    type: Date,
  })
  endTime: Date;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID của sự kiện liên quan đến phiên đấu giá',
    example: 1,
    type: Number,
  })
  eventID: number;
}

