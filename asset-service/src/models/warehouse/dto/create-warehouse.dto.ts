import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateWarehouseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The location of the warehouse',
    example: 'Khu Phu Hoa, Thu Dau Mot, Binh Duong'
  })
  location: string;
}
