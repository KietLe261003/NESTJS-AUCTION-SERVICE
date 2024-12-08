import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DepositsService } from './deposits.service';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';
import { Code } from 'typeorm';

@Controller('auction-management-service/deposits')
export class DepositsController {
  constructor(private readonly depositsService: DepositsService) { }

  @Post()
  async create(@Body() createDepositDto: CreateDepositDto): Promise<ApiResponseMeta> {
    const newDeposit = await this.depositsService.create(createDepositDto)
    return {
      code: 201,
      message: 'CREATED',
      metadata: {
        deposit: newDeposit
      }
    }
  }

  @Get()
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

    const result = await this.depositsService.findAll(page, limit, parsedFilter, parsedOrder, parsedSelect);
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
  async findOne(@Param('id') id: number): Promise<ApiResponseMeta> {
    const deposit = await this.depositsService.findOne(id);
    return {
      code: 200,
      message: 'OK',
      metadata: {
        deposit: deposit,
      },
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDepositDto: UpdateDepositDto): Promise<ApiResponseMeta> {
    const updated = await this.depositsService.update(+id, updateDepositDto)
    return {
      code: 200,
      message: "OK",
      metadata: {
        deposit: updated
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ApiResponseMeta> {
    await this.depositsService.remove(+id);
    return {
      code: 200,
      message: 'OK',
      metadata: null
    }
  }
}
