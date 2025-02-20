
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { AuctionSession } from './entities/auction-session.entity';
import { CreateAuctionSessionDto } from './dto/create-auction-session.dto';

@Injectable()
export class AuctionSessionService {
  constructor(@InjectRepository(AuctionSession) private readonly auctionRepository: Repository<AuctionSession>) { }

  async create(createAuctionDto: CreateAuctionSessionDto): Promise<AuctionSession> {
    const created = this.auctionRepository.create(createAuctionDto);
    return await this.auctionRepository.save(created);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    filter: FindOptionsWhere<AuctionSession> = {},
    order: FindOptionsOrder<AuctionSession> = {},
    select: (keyof AuctionSession)[] = ['id', 'name', 'startTime', 'endTime', 'assetId']
  ): Promise<{ data: Partial<AuctionSession>[]; total: number }> {
    const [data, total] = await Promise.all([
      this.auctionRepository.find({
        skip: (page - 1) * limit,
        take: limit,
        where: filter,
        order: order,
        select: select,
      }),
      this.auctionRepository.count({ where: filter }),
    ]);
    return { data, total };
  }

  async findOne(id: number): Promise<AuctionSession> {
    const auction = await this.auctionRepository.findOne({ where: { id } });
    if (!auction) {
      throw new HttpException(
        { code: 404, message: `Auction with ID ${id} not found`, metadata: null },
        HttpStatus.NOT_FOUND
      );
    }
    return auction;
  }

  async update(id: number, updateAuctionDto: Partial<CreateAuctionSessionDto>): Promise<AuctionSession> {
    await this.auctionRepository.update({ id }, updateAuctionDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.auctionRepository.delete({ id });
    if (result.affected === 0) {
      throw new HttpException(
        { code: 404, message: `Auction with ID ${id} not found`, metadata: null },
        HttpStatus.NOT_FOUND
      );
    }
    return true;
  }
}

