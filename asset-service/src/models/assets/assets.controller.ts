import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('assets')
export class AssetsController {
  constructor(
    private readonly assetsService: AssetsService
  ) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Create a new asset' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Data to create an asset with an uploaded file',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        assetName: {
          type: 'string',
          description: 'The name of the asset',
          example: 'asset001',
        },
        assetDescription: {
          type: 'text',
          description: 'The name of the asset',
          example: 'asset001',
        },
        assetPrice: {
          type: 'number',
          description: 'The number of the asset',
          example: '10000',
        },
        inspectorID: {
          type: 'number',
          description: 'The inspectorID of the asset',
          example: '1',
        },
        assetTypeID: {
          type: 'number',
          description: 'The assetTypeID of the asset',
          example: '1',
        },
        assetStatusID: {
          type: 'number',
          description: 'The assetStatusID of the asset',
          example: '1',
        },
      },
    },
  })
  create(
    @Body() createAssetDto: CreateAssetDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.assetsService.create(createAssetDto, file);
  }

  @Get()
  findAll() {
    return this.assetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.assetsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateAssetDto: UpdateAssetDto, @UploadedFile() file: Express.Multer.File,
  ) {
    return this.assetsService.update(id, updateAssetDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.assetsService.remove(id);
  }
}
