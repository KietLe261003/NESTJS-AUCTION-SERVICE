import { Controller, Get, Post, Body, Patch, Param, Delete, Query, createParamDecorator } from '@nestjs/common';
import { BiddingHistoryService } from './bidding-history.service';
import { CreateBiddingHistoryDto } from './dto/create-bidding-history.dto';
import { UpdateBiddingHistoryDto } from './dto/update-bidding-history.dto';

@Controller('auction-management-service/bidding-history')
export class BiddingHistoryController {
  constructor(private readonly biddingHistoryService: BiddingHistoryService) { }

  @Post()
  async create(@Body() createBiddingHistoryDto: CreateBiddingHistoryDto): Promise<ApiResponseMeta> {
    const newBiddingHistory = await this.biddingHistoryService.create(createBiddingHistoryDto)
    return {
      code: 201,
      message: 'CREATED',
      metadata: {
        biddingHistory: newBiddingHistory
      }
    }
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('filter') filter: any = {},
    @Query('order') order: any = {},
    @Query('select') select: any = ['userID', 'bidTime', 'auctionItemID', 'bidHistoryID']): Promise<ApiResponseMeta> {
    const parsedFilter = typeof filter === 'string' ? JSON.parse(filter) : filter;
    const parsedOrder = typeof order === 'string' ? JSON.parse(order) : order;
    const parsedSelect = typeof select === 'string' ? JSON.parse(select) : select;

    const result = await this.biddingHistoryService.findAll(page, limit, parsedFilter, parsedOrder, parsedSelect);
    return {
      code: 200,
      message: "OK",
      metadata: {
        biddingHistories: result.data,
        total: result.total,
        page,
        lastPage: Math.ceil(result.total / limit)
      }
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ApiResponseMeta> {
    const biddingHistory = await this.biddingHistoryService.findOne(id)
    return {
      code: 200,
      message: "OK",
      metadata: {
        biddingHistory: biddingHistory
      }
    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateBiddingHistoryDto: UpdateBiddingHistoryDto): Promise<ApiResponseMeta> {
    const udpatedBiddingHistory = await this.biddingHistoryService.update(id, updateBiddingHistoryDto)
    return {
      code: 200,
      message: "OK",
      metadata: {
        biddingHistory: udpatedBiddingHistory
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<ApiResponseMeta> {
    await this.biddingHistoryService.remove(id)
    return {
      code: 200,
      message: 'OK',
      metadata: null
    }
  }
}
