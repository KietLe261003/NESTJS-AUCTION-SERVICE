import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuctionSessionDto } from './dto/create-auction-session.dto';
import { UpdateAuctionSessionDto } from './dto/update-auction-session.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuctionSession } from './entities/auction-session.entity';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class AuctionSessionService {
  constructor(@InjectRepository(AuctionSession) private readonly auctionSessionRepository: Repository<AuctionSession>) { }
  async create(createAuctionSessionDto: CreateAuctionSessionDto): Promise<AuctionSession> {
    const created = this.auctionSessionRepository.create(createAuctionSessionDto)
    const saved = await this.auctionSessionRepository.save(created)
    return saved;
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    filter: FindOptionsWhere<AuctionSession> = {},
    order: FindOptionsOrder<AuctionSession> = {},
    select: (keyof AuctionSession)[] = ['auctionSessionID', 'startTime', 'endTime', 'eventID']
  ): Promise<{ data: Partial<AuctionSession>[]; total: number }> {
    const [data, total] = await Promise.all([
      this.auctionSessionRepository.find({
        skip: (page - 1) * limit,
        take: limit,
        where: filter,
        order: order,
        select: select,
      }),
      this.auctionSessionRepository.count({ where: filter }),
    ]);

    return { data, total };
  }




  async findOne(id: number): Promise<AuctionSession> {
    const auctionSession = await this.auctionSessionRepository.findOne({ where: { auctionSessionID: id } });

    if (!auctionSession) {
      throw new HttpException(
        {
          code: 404,
          message: `Auction session with ID ${id} not found`,
          metadata: null,
        },
        HttpStatus.NOT_FOUND
      );
    }

    return auctionSession;
  }

  async update(id: number, updateAuctionSessionDto: UpdateAuctionSessionDto): Promise<AuctionSession> {
    const updatting = await this.auctionSessionRepository.update({ auctionSessionID: id }, updateAuctionSessionDto)
    if (!updatting) {
      throw new HttpException(
        {
          code: 404,
          message: `Auction session with ID ${id} not found`,
          metadata: null,
        },
        HttpStatus.NOT_FOUND
      );
    }
    const updatedAuctionSession = await this.findOne(id)
    return updatedAuctionSession
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.auctionSessionRepository.delete({ auctionSessionID: id })
    if (result.affected === 0) {
      throw new HttpException(
        {
          code: 404,
          message: `Auction session with ID ${id} not found`,
          metadata: null,
        },
        HttpStatus.NOT_FOUND
      );
    }
    return true;
  }
}
