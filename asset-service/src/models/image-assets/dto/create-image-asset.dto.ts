import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateImageAssetDto {
  @IsNumber()
  @IsNotEmpty()
  assetID: number

  @IsString()
  imageAsset:string 
}
