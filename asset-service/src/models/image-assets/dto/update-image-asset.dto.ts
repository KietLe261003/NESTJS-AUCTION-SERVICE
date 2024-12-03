import { PartialType } from '@nestjs/swagger';
import { CreateImageAssetDto } from './create-image-asset.dto';

export class UpdateImageAssetDto extends PartialType(CreateImageAssetDto) {}
