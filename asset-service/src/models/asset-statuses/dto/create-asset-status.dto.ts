import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateAssetStatusDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The name of a asset status',
    example: 'asset status name 1',
    required: true
  })
  assetStatusName: string;
}
