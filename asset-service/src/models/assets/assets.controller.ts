import { Query, Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiBody, ApiConsumes, ApiParam } from '@nestjs/swagger';
import { ApiQuery } from '@nestjs/swagger';
@Controller('asset-service/assets')
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
        userID: {
          type: 'number',
          description: 'The userID of the asset',
          example: '1',
        },
        address: {
          type: 'string',
          description: 'The address of the asset',
          example: 'address',
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
  @ApiOperation({ summary: 'Get a list of auction items' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number for pagination (default: 1)',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of records per page (default: 10)',
    example: 10,
  })
  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('filter') filter: any = {},
    @Query('order') order: any = {},
    @Query('select') select: any = {}
  ) {
    return this.assetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.assetsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Update an asset with optional file upload' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the asset to update',
    example: 1,
  })
  @ApiBody({
    description: 'Data to update an asset with an optional uploaded file',
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
          type: 'string',
          description: 'A description of the asset',
          example: 'This is an asset description.',
        },
        assetPrice: {
          type: 'number',
          description: 'The price of the asset',
          example: 10000,
        },
        inspectorID: {
          type: 'number',
          description: 'The ID of the inspector for the asset',
          example: 1,
        },
        assetTypeID: {
          type: 'number',
          description: 'The ID of the asset type',
          example: 1,
        },
        assetStatusID: {
          type: 'number',
          description: 'The ID of the asset status',
          example: 1,
        },
      },
    },
  })
  async update(
    @Param('id') id: number,
    @Body() updateAssetDto: UpdateAssetDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.assetsService.update(id, updateAssetDto, file);
  }


  @Post(':id/upload/images')
  @UseInterceptors(FilesInterceptor('files')) // Đổi từ FileInterceptor thành FilesInterceptor
  @ApiOperation({ summary: 'Upload multiple images for an asset' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the asset to upload images for',
    example: 1,
  })
  @ApiBody({
    description: 'Data to upload multiple images for an asset',
    required: true,
    schema: {
      type: 'object',
      properties: {
        files: { // Đổi 'file' thành 'files' để khớp với FilesInterceptor
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  async uploadImages(
    @Param('id') id: number,
    @UploadedFiles() files: Express.Multer.File[], // Đổi @UploadedFile thành @UploadedFiles
  ) {
    return await this.assetsService.addImages(id, files); // Cập nhật logic xử lý
  }


  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.assetsService.remove(id);
  }

  @Post(':id/approve')
  @ApiOperation({ summary: 'Approve an asset' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the asset to approve',
    example: 1,
  })
  async approve(@Param('id') id: number) {
    return await this.assetsService.approve(id);
  }

  @Post(':id/reject')
  @ApiOperation({ summary: 'Reject an asset' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the asset to reject',
    example: 1,
  })
  @ApiBody({
    description: 'Data to reject an asset',
    required: true,
    schema: {
      type: 'object',
      properties: {
        reason: {
          type: 'string',
          description: 'The reason for rejecting the asset',
          example: 'This asset is not suitable for auction.',
        },
      },
    },
  })
  async reject(@Param('id') id: number, @Body() body: { reason: string }) {
    return await this.assetsService.reject(id, body.reason);
  }
}
