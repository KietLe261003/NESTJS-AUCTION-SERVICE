
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AssetStatusesService } from './asset-statuses.service';
import { CreateAssetStatusDto } from './dto/create-asset-status.dto';
import { UpdateAssetStatusDto } from './dto/update-asset-status.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AssetStatus } from './entities/asset-status.entity';

@ApiTags('Asset Statuses')
@Controller('asset-statuses')
export class AssetStatusesController {
  constructor(private readonly assetStatusesService: AssetStatusesService) { }

  @Post()
  @ApiOperation({ summary: 'Create asset status' })
  @ApiResponse({
    status: 201,
    description: 'Asset status created successfully',
    schema: {
      example: {
        code: 201,
        message: 'Asset status created successfully',
        metadata: {
          assetStatusID: 1,
          assetStatusName: 'asset status name 1',
          delflag: false,
          created_at: '1730889366606',
          updated_at: '1730889366607',
          deleted_at: null,
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    schema: {
      example: {
        code: 500,
        message: 'Internal server error occurred',
      },
    },
  })
  create(@Body() createAssetStatusDto: CreateAssetStatusDto) {
    return this.assetStatusesService.create(createAssetStatusDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all asset statuses' })
  @ApiResponse({
    status: 200,
    description: 'Asset statuses retrieved successfully',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    schema: {
      example: {
        code: 500,
        message: 'Internal server error occurred',
      },
    },
  })
  findAll() {
    return this.assetStatusesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve an asset status by ID' })
  @ApiResponse({
    status: 200,
    description: 'Asset status retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Asset status not found',
    schema: {
      example: {
        code: 404,
        message: 'Asset status with ID 1 not found',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    schema: {
      example: {
        code: 500,
        message: 'Internal server error occurred',
      },
    },
  })
  findOne(@Param('id') id: number) {
    return this.assetStatusesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an asset status by ID' })
  @ApiResponse({
    status: 200,
    description: 'Asset status updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Asset status not found',
    schema: {
      example: {
        code: 404,
        message: 'Asset status with ID 1 not found',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    schema: {
      example: {
        code: 500,
        message: 'Internal server error occurred',
      },
    },
  })
  update(@Param('id') id: number, @Body() updateAssetStatusDto: UpdateAssetStatusDto) {
    return this.assetStatusesService.update(id, updateAssetStatusDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an asset status by ID' })
  @ApiResponse({
    status: 200,
    description: 'Asset status deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Asset status not found',
    schema: {
      example: {
        code: 404,
        message: 'Asset status with ID 1 not found',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    schema: {
      example: {
        code: 500,
        message: 'Internal server error occurred',
      },
    },
  })
  remove(@Param('id') id: number) {
    return this.assetStatusesService.remove(id);
  }
}

