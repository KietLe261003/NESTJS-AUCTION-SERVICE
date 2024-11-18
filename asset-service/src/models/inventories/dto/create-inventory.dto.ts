
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateInventoryDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: "The quantity of the inventory",
    example: 10
  })
  quantity: number;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The entry time of the inventory',
    example: Date.now()
  })
  entryTime: Date;

  @IsDateString()
  @IsOptional()
  @ApiProperty({
    description: 'The exit time of the inventory',
    example: Date.now()
  })
  exitTime?: Date;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The warehouseID of the inventory',
    example: 1
  })
  warehouseID: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The assetID of the inventory',
    example: 1
  })
  assetID: number;
}

