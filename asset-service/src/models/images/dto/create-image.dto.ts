import { Asset } from "src/models/assets/entities/asset.entity";

export class CreateImageDto {
  url: string;
  asset: Asset
}
