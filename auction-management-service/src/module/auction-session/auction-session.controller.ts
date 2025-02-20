import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseFilters } from '@nestjs/common';
import { AuctionSessionService } from './auction-session.service';
import { CreateAuctionSessionDto } from './dto/create-auction-session.dto';
import { UpdateAuctionSessionDto } from './dto/update-auction-session.dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { AuctionSession } from './entities/auction-session.entity';

@Controller('auction-management-service/auction-session')
export class AuctionSessionController {
  constructor(private readonly auctionSessionService: AuctionSessionService) { }

  @Post()
  async create(@Body() createAuctionSessionDto: CreateAuctionSessionDto): Promise<ApiResponseMeta> {
    const newAuctionSession = await this.auctionSessionService.create(createAuctionSessionDto);
    return {
      code: 201,
      message: 'CREATED',
      metadata: {
        auctionSession: newAuctionSession
      }
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve a paginated list of auction sessions' })
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
    example: '{ "isDelete": false}',
  })
  @ApiQuery({
    name: 'order',
    required: false,
    type: String,
    description: 'JSON stringified object to specify sorting order of results',
    example: '{"startTime": "ASC"}',
  })
  @ApiQuery({
    name: 'select',
    required: false,
    type: String,
    description: 'JSON stringified array of fields to include in the result',
    example: '["id","name","startTime", "endTime", "paymentDeadline"]',
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

    const result = await this.auctionSessionService.findAll(page, limit, parsedFilter, parsedOrder, parsedSelect);

    return {
      code: 200,
      message: 'OK',
      metadata: {
        auctionSessions: result.data,
        total: result.total,
        page,
        lastPage: Math.ceil(result.total / limit)
      }
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ApiResponseMeta> {
    const auctionSession = await this.auctionSessionService.findOne(id);
    return {
      code: 200,
      message: 'OK',
      metadata: {
        auctionSession: auctionSession
      }
    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateAuctionSessionDto: UpdateAuctionSessionDto): Promise<ApiResponseMeta> {
    const updatedAuctionSession = await this.auctionSessionService.update(id, updateAuctionSessionDto);
    return {
      code: 200,
      message: 'OK',
      metadata: {
        auctionSession: updatedAuctionSession
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<ApiResponseMeta> {
    await this.auctionSessionService.remove(id)
    return {
      code: 200,
      message: 'OK',
      metadata: null
    }
  }
}
