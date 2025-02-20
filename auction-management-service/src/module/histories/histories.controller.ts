import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { HistoriesService } from './histories.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';

@Controller('auction-management-service/histories')
export class HistoriesController {
  constructor(private readonly historiesService: HistoriesService) { }

  @Post()
  async create(@Body() createHistoryDto: CreateHistoryDto): Promise<ApiResponseMeta> {
    const newHistory = await this.historiesService.create(createHistoryDto)
    return {
      code: 201,
      message: 'CREATED',
      metadata: {
        history: newHistory
      }
    }
  }

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

    const result = await this.historiesService.findAll(page, limit, parsedFilter, parsedOrder, parsedSelect);

    return {
      code: 200,
      message: 'OK',
      metadata: {
        histories: result.data,
        total: result.total,
        page,
        lastPage: Math.ceil(result.total / limit)
      }
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ApiResponseMeta> {
    const history = await this.historiesService.findOne(id)
    return {
      code: 200,
      message: 'OK',
      metadata: {
        history: history
      }
    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateHistoryDto: UpdateHistoryDto): Promise<ApiResponseMeta> {
    const updatedHistory = await this.historiesService.update(id, updateHistoryDto)
    return {
      code: 200,
      message: "OK",
      metadata: {
        history: updatedHistory
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<ApiResponseMeta> {
    await this.historiesService.remove(id)
    return {
      code: 200,
      message: 'OK',
      metadata: null
    }
  }
}
