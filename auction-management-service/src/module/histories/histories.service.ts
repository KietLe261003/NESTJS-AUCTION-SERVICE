import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { BiddingHistoryService } from '../bidding-history/bidding-history.service';
import { History } from './entities/history.entity';

@Injectable()
export class HistoriesService {
  constructor(
    @InjectRepository(History) private readonly historiesRepository: Repository<History>,
    private readonly bidHistoriesService: BiddingHistoryService
  ) { }
  async create(createHistoryDto: CreateHistoryDto): Promise<History> {
    const biddingHistory = await this.bidHistoriesService.findOne(createHistoryDto.bidHistoryId)
    if (!biddingHistory) throw new HttpException({
      code: 404,
      message: `Bidding history with ID ${createHistoryDto.bidHistoryId} not found`,
      metadata: null
    }, HttpStatus.NOT_FOUND);

    const createdHistory = this.historiesRepository.create(createHistoryDto)
    const savedHistory = await this.historiesRepository.save(createdHistory)

    const history = await this.findOne(savedHistory.historyId);
    return history
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    filter: FindOptionsWhere<History> = {},
    order: FindOptionsOrder<History> = {},
    select: (keyof History)[] = ['historyId', 'userId', 'billId', 'bidHistoryId']
  ): Promise<{ data: Partial<History>[]; total: number }> {
    const [data, total] = await Promise.all([
      this.historiesRepository.find({
        skip: (page - 1) * limit,
        take: limit,
        where: filter,
        order: order,
        select: select,
      }),
      this.historiesRepository.count({ where: filter }),
    ]);

    return { data, total };
  }

  async findOne(id: number, select: (keyof History)[] = ['historyId', 'userId', 'billId', 'bidHistoryId']): Promise<History> {
    const history = await this.historiesRepository.findOne({ where: { historyId: id }, select: select })
    if (!history) {
      throw new HttpException(
        {
          code: 404,
          message: `History with ID ${id} not found`,
          metadata: null,
        },
        HttpStatus.NOT_FOUND
      );
    }
    return history
  }

  async update(id: number, updateHistoryDto: UpdateHistoryDto): Promise<History> {
    const updatting = await this.historiesRepository.update({ historyId: id }, updateHistoryDto)
    if (!updatting) {
      throw new HttpException(
        {
          code: 404,
          message: `History with ID ${id} not found`,
          metadata: null,
        },
        HttpStatus.NOT_FOUND
      );
    }
    const updatedHistory = await this.findOne(id)
    return updatedHistory
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.historiesRepository.delete({ historyId: id })
    if (result.affected === 0) {
      throw new HttpException(
        {
          code: 404,
          message: `History with ID ${id} not found`,
          metadata: null,
        },
        HttpStatus.NOT_FOUND
      );
    }
    return true;
  }
}
