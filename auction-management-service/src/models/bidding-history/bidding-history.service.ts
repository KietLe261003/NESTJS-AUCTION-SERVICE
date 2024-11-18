import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBiddingHistoryDto } from './dto/create-bidding-history.dto';
import { UpdateBiddingHistoryDto } from './dto/update-bidding-history.dto';
import { BiddingHistory } from './entities/bidding-history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { AuctionItemService } from '../auction-item/auction-item.service';

@Injectable()
export class BiddingHistoryService {
  constructor(
    @InjectRepository(BiddingHistory) private readonly biddingHistoryRepository: Repository<BiddingHistory>,
    private readonly auctionItemService: AuctionItemService
  ) { }

  async create(createBiddingHistoryDto: CreateBiddingHistoryDto): Promise<BiddingHistory> {
    const auctionItem = await this.auctionItemService.findOne(createBiddingHistoryDto.auctionItemID)

    if (!auctionItem) throw new HttpException({
      code: 404,
      message: `Auction item with ID ${createBiddingHistoryDto.auctionItemID} not found`,
      metadata: null
    }, HttpStatus.NOT_FOUND);

    const createdBiddingHistory = this.biddingHistoryRepository.create(createBiddingHistoryDto);
    const savedBddingHistory = await this.biddingHistoryRepository.save(createdBiddingHistory)

    const biddingHistory = await this.findOne(savedBddingHistory.bidHistoryID);
    return biddingHistory
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    filter: FindOptionsWhere<BiddingHistory> = {},
    order: FindOptionsOrder<BiddingHistory> = {},
    select: (keyof BiddingHistory)[] = ['userID', 'bidTime', 'auctionItemID', 'bidHistoryID']
  ): Promise<{ data: Partial<BiddingHistory>[]; total: number }> {
    const [data, total] = await Promise.all([
      this.biddingHistoryRepository.find({
        skip: (page - 1) * limit,
        take: limit,
        where: filter,
        order: order,
        select: select,
      }),
      this.biddingHistoryRepository.count({ where: filter }),
    ]);

    return { data, total };
  }

  async findOne(id: number, select: (keyof BiddingHistory)[] = ['userID', 'bidTime', 'auctionItemID', 'bidHistoryID']) {
    const biddingHistory = await this.biddingHistoryRepository.findOne({ where: { bidHistoryID: id }, select: select })
    if (!biddingHistory) {
      throw new HttpException(
        {
          code: 404,
          message: `Bidding history with ID ${id} not found`,
          metadata: null,
        },
        HttpStatus.NOT_FOUND
      );
    }
    return biddingHistory
  }

  async update(id: number, updateBiddingHistoryDto: UpdateBiddingHistoryDto): Promise<BiddingHistory> {
    const updatting = await this.biddingHistoryRepository.update({ bidHistoryID: id }, updateBiddingHistoryDto)
    if (!updatting) {
      throw new HttpException(
        {
          code: 404,
          message: `Bidding history with ID ${id} not found`,
          metadata: null,
        },
        HttpStatus.NOT_FOUND
      );
    }
    const updatedBiddingHistory = await this.findOne(id)
    return updatedBiddingHistory

  }

  async remove(id: number): Promise<boolean> {
    const result = await this.biddingHistoryRepository.delete({ bidHistoryID: id })

    if (result.affected === 0) {
      throw new HttpException(
        {
          code: 404,
          message: `Bidding history with ID ${id} not found`,
          metadata: null,
        },
        HttpStatus.NOT_FOUND
      );
    }

    return true;
  }
}
