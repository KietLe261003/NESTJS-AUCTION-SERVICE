import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImageAssetsService } from './image-assets.service';
import { CreateImageAssetDto } from './dto/create-image-asset.dto';
import { UpdateImageAssetDto } from './dto/update-image-asset.dto';
import { ExpressAdapter } from '@nestjs/platform-express';

@Controller('image-assets')
export class ImageAssetsController {
  constructor(private readonly imageAssetsService: ImageAssetsService) { }

  @Post()
  create(@Body() createImageAssetDto: CreateImageAssetDto, file: Express.Multer.File) {
    return this.imageAssetsService.create(createImageAssetDto, file);
  }

  @Get()
  findAll() {
    return this.imageAssetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imageAssetsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageAssetDto: UpdateImageAssetDto) {
    return this.imageAssetsService.update(+id, updateImageAssetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageAssetsService.remove(+id);
  }
}
