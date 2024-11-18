import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateAssetTypeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The asset type name of the asset',
    example: 'asset type name 1',
    required: true
  })
  assetTypeName: string;
}
