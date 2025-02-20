import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuctionItemDto } from './dto/create-auction-item.dto';
import { UpdateAuctionItemDto } from './dto/update-auction-item.dto';
import { AuctionItem } from './entities/auction-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { AuctionSessionService } from '../auction-session/auction-session.service';

@Injectable()
export class AuctionItemService {
  constructor(
    @InjectRepository(AuctionItem) private readonly auctionItemRepository: Repository<AuctionItem>,
    private readonly auctionSessionService: AuctionSessionService
  ) { }
  async create(createAuctionItemDto: CreateAuctionItemDto): Promise<AuctionItem> {
    const auctionSession = await this.auctionSessionService.findOne(createAuctionItemDto.auctionSessionId);
    if (!auctionSession) throw new HttpException({
      code: 404,
      message: `Auction session with ID ${createAuctionItemDto.auctionSessionId} not found`,
      metadata: null
    }, HttpStatus.NOT_FOUND);

    const createdAuctionItem = this.auctionItemRepository.create(createAuctionItemDto);
    const savedAuctionItem = await this.auctionItemRepository.save(createdAuctionItem);

    const auctionItem = await this.findOne(savedAuctionItem.auctionItemId)
    return auctionItem
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    filter: FindOptionsWhere<AuctionItem> = {},
    order: FindOptionsOrder<AuctionItem> = {},
    select: (keyof AuctionItem)[] = ['auctionItemId', 'auctionSessionId', 'assetId', 'startingBids', 'bidIncrement']
  ): Promise<{ data: Partial<AuctionItem>[]; total: number }> {
    const [data, total] = await Promise.all([
      this.auctionItemRepository.find({
        skip: (page - 1) * limit,
        take: limit,
        where: filter,
        order: order,
        select: select,
      }),
      this.auctionItemRepository.count({ where: filter }),
    ]);

    return { data, total };
  }

  async findOne(id: number, select: (keyof AuctionItem)[] = ['auctionItemId', 'auctionSessionId', 'assetId', 'startingBids', 'bidIncrement']
  ): Promise<AuctionItem> {
    const auctionItem = await this.auctionItemRepository.findOne({ where: { auctionItemId: id }, select: select });
    if (!auctionItem) {
      throw new HttpException(
        {
          code: 404,
          message: `Auction item with ID ${id} not found`,
          metadata: null,
        },
        HttpStatus.NOT_FOUND
      );
    }
    return auctionItem
  }

  async update(id: number, updateAuctionItemDto: UpdateAuctionItemDto): Promise<AuctionItem> {
    const updatting = await this.auctionItemRepository.update({ auctionItemId: id }, updateAuctionItemDto)
    if (!updatting) {
      throw new HttpException(
        {
          code: 404,
          message: `Auction item with ID ${id} not found`,
          metadata: null,
        },
        HttpStatus.NOT_FOUND
      );
    }
    const updatedAuctionItem = await this.findOne(id)
    return updatedAuctionItem
  }


  async remove(id: number): Promise<boolean> {
    const result = await this.auctionItemRepository.delete({ auctionItemId: id })
    if (result.affected === 0) {
      throw new HttpException(
        {
          code: 404,
          message: `Auction item with ID ${id} not found`,
          metadata: null,
        },
        HttpStatus.NOT_FOUND
      );
    }
    return true;
  }
}
