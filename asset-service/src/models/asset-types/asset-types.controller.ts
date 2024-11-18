import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AssetTypesService } from './asset-types.service';
import { CreateAssetTypeDto } from './dto/create-asset-type.dto';
import { UpdateAssetTypeDto } from './dto/update-asset-type.dto';

@Controller('asset-types')
export class AssetTypesController {
  constructor(private readonly assetTypesService: AssetTypesService) { }

  @Post()
  create(@Body() createAssetTypeDto: CreateAssetTypeDto) {
    return this.assetTypesService.create(createAssetTypeDto);
  }

  @Get()
  findAll() {
    return this.assetTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.assetTypesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateAssetTypeDto: UpdateAssetTypeDto) {
    return this.assetTypesService.update(id, updateAssetTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.assetTypesService.remove(id);
  }
}
