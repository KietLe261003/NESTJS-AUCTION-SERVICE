
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateAuctionSessionDto {
  @ApiProperty({
    description: "Tên phiên đấu giá (cũng là tên sản phẩm)",
    example: "Đồng hồ Rolex 2024",
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: "Thời gian bắt đầu phiên đấu giá",
    example: "2025-03-01T10:00:00.000Z",
  })
  @IsNotEmpty()
  @IsDate()
  startTime: Date;

  @ApiProperty({
    description: "Thời gian kết thúc phiên đấu giá",
    example: "2025-03-01T12:00:00.000Z",
  })
  @IsNotEmpty()
  @IsDate()
  endTime: Date;

  @ApiProperty({
    description: "Thời gian thanh toán (tính bằng phút)",
    example: 30,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  paymentDeadline: number;

  @ApiProperty({
    description: "Mã tài sản được đấu giá",
    example: 67890,
  })
  @IsNotEmpty()
  @IsString()
  assetId: number;

  @ApiProperty({
    description: "Phí tham gia đấu giá",
    example: 500000,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  depositFee: number;

  @ApiProperty({
    description: "Bước giá tối thiểu khi đấu giá",
    example: 10000,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  bidStep: number;
}

