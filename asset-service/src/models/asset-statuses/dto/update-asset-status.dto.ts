import { PartialType } from '@nestjs/mapped-types';
import { CreateAssetStatusDto } from './create-asset-status.dto';

export class UpdateAssetStatusDto extends PartialType(CreateAssetStatusDto) {
  id: number;
}
