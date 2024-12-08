
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AuctionItemService } from './auction-item.service';
import { CreateAuctionItemDto } from './dto/create-auction-item.dto';
import { UpdateAuctionItemDto } from './dto/update-auction-item.dto';
import { ApiOperation, ApiTags, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auction Item')
@Controller('auction-management-service/auction-item')
export class AuctionItemController {
  constructor(private readonly auctionItemService: AuctionItemService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new auction item' })
  @ApiResponse({
    status: 201,
    description: 'The auction item has been successfully created.',
    schema: {
      example: {
        code: 201,
        message: 'CREATED',
        metadata: {
          auctionItem: {
            auctionItemId: 1,
            auctionSessionId: 1,
            assetId: 123,
            startingBids: 100,
            bidIncrement: 100,
          },
        },
      },
    },
  })
  async create(@Body() createAuctionItemDto: CreateAuctionItemDto): Promise<ApiResponseMeta> {
    const newAuctionItem = await this.auctionItemService.create(createAuctionItemDto);
    return {
      code: 201,
      message: 'CREATED',
      metadata: {
        auctionItem: newAuctionItem,
      },
    };
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
  @ApiQuery({
    name: 'filter',
    required: false,
    type: String,
    description: 'JSON stringified object for filtering results by specific fields',
    example: '{"auctionSessionId": 2}',
  })
  @ApiQuery({
    name: 'order',
    required: false,
    type: String,
    description: 'JSON stringified object to specify sorting order of results',
    example: '{"startingBids": "ASC"}',
  })
  @ApiQuery({
    name: 'select',
    required: false,
    type: String,
    description: 'JSON stringified array of fields to include in the result',
    example: '["auctionItemId","auctionSessionId", "startingBids", "bidIncrement"]',
  })
  @ApiResponse({
    status: 200,
    description: 'List of auction items',
    schema: {
      example: {
        code: 200,
        message: 'OK',
        metadata: {
          auctionItem: [
            {
              auctionItemId: 1,
              auctionSessionId: 101,
              assetId: 5001,
              startingBids: 1000,
              bidIncrement: 50,
              delflag: false,
              created_at: '2024-11-11T00:00:00.000Z',
              updated_at: '2024-11-11T12:00:00.000Z',
              deleted_at: null,
            },
            {
              auctionItemId: 2,
              auctionSessionId: 102,
              assetId: 5002,
              startingBids: 2000,
              bidIncrement: 100,
              delflag: false,
              created_at: '2024-11-11T01:00:00.000Z',
              updated_at: '2024-11-11T13:00:00.000Z',
              deleted_at: null,
            },
          ],
          total: 2,
          page: 1,
          lastPage: 1,
        },
      },
    },
  })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('filter') filter: any = {},
    @Query('order') order: any = {},
    @Query('select') select: any = {}
  ): Promise<ApiResponseMeta> {
    const parsedFilter = typeof filter === 'string' ? JSON.parse(filter) : filter;
    const parsedOrder = typeof order === 'string' ? JSON.parse(order) : order;
    const parsedSelect = typeof select === 'string' ? JSON.parse(select) : select;

    const result = await this.auctionItemService.findAll(page, limit, parsedFilter, parsedOrder, parsedSelect);
    return {
      code: 200,
      message: 'OK',
      metadata: {
        auctionItem: result.data,
        total: result.total,
        page,
        lastPage: Math.ceil(result.total / limit),
      },
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details of a specific auction item' })
  @ApiParam({ name: 'id', type: Number, description: 'Auction item ID' })
  @ApiResponse({
    status: 200,
    description: 'Details of the requested auction item.',
    schema: {
      example: {
        code: 200,
        message: 'OK',
        metadata: {
          auctionItem: {
            auctionItemId: 1,
            auctionSessionId: 1,
            assetId: 123,
            startingBids: 100,
            bidIncrement: 100,
          },
        },
      },
    },
  })
  async findOne(@Param('id') id: number): Promise<ApiResponseMeta> {
    const auctionItem = await this.auctionItemService.findOne(id);
    return {
      code: 200,
      message: 'OK',
      metadata: {
        auctionItem: auctionItem,
      },
    };
  }


  @Patch(':id')
  @ApiOperation({ summary: 'Update an auction item by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Auction item ID' })
  @ApiResponse({
    status: 200,
    description: 'The auction item has been successfully updated.',
    schema: {
      example: {
        code: 200,
        message: 'OK',
        metadata: {
          auctionItem: {
            auctionItemId: 1,
            auctionSessionId: 1,
            assetId: 123,
            startingBids: 100,
            bidIncrement: 150, // Updated value
          },
        },
      },
    },
  })
  async update(@Param('id') id: number, @Body() updateAuctionItemDto: UpdateAuctionItemDto): Promise<ApiResponseMeta> {
    const updatedAuctionItem = await this.auctionItemService.update(id, updateAuctionItemDto);
    return {
      code: 200,
      message: 'OK',
      metadata: {
        auctionItem: updatedAuctionItem,
      },
    };
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Delete an auction item by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Auction item ID' })
  @ApiResponse({
    status: 200,
    description: 'The auction item has been successfully deleted.',
    schema: {
      example: {
        code: 200,
        message: 'OK',
        metadata: null,
      },
    },
  })
  async remove(@Param('id') id: number): Promise<ApiResponseMeta> {
    await this.auctionItemService.remove(id);
    return {
      code: 200,
      message: 'OK',
      metadata: null,
    };
  }
}
