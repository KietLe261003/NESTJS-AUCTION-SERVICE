import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsOrder, FindOptionsWhere, Repository } from "typeorm";
import { AuctionSessionHistory } from "./entities/auction-session-history.entity";

@Injectable()
export class AuctionSessionHistoryService {
  constructor(
    @InjectRepository(AuctionSessionHistory)
    private readonly auctionSessionHistoryRepository: Repository<AuctionSessionHistory>
  ) { }

  async createHistoryEntry(auctionSessionId: number, userId: number, bidAmount: number): Promise<AuctionSessionHistory> {
    const historyEntry = this.auctionSessionHistoryRepository.create({
      auctionSession: { id: auctionSessionId },
      userId,
      bidAmount,
    });

    return await this.auctionSessionHistoryRepository.save(historyEntry);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    filter: FindOptionsWhere<AuctionSessionHistory> = {},
    order: FindOptionsOrder<AuctionSessionHistory> = { bidTime: "DESC" },
    select: (keyof AuctionSessionHistory)[] = ["id", "auctionSession", "userId", "bidAmount", "bidTime"]
  ): Promise<{ data: Partial<AuctionSessionHistory>[]; total: number }> {
    const [data, total] = await Promise.all([
      this.auctionSessionHistoryRepository.find({
        skip: (page - 1) * limit,
        take: limit,
        where: filter,
        order: order,
        //select: select,
        relations: ["auctionSession"],
      }),
      this.auctionSessionHistoryRepository.count({ where: filter }),
    ]);

    return { data, total };
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.auctionSessionHistoryRepository.delete({ id });
    if (result.affected === 0) {
      throw new HttpException(
        { code: 404, message: `Auction session history with ID ${id} not found`, metadata: null },
        HttpStatus.NOT_FOUND
      );
    }
    return true;
  }


  async findByAuctionSessionId(
    auctionSessionId: number,
    page: number = 1,
    limit: number = 10,
    order: FindOptionsOrder<AuctionSessionHistory> = { bidTime: "DESC" },
    select: (keyof AuctionSessionHistory)[] = ["id", "userId", "bidAmount", "bidTime"]
  ): Promise<{ data: Partial<AuctionSessionHistory>[]; total: number }> {
    const [data, total] = await Promise.all([
      this.auctionSessionHistoryRepository.find({
        skip: (page - 1) * limit,
        take: limit,
        where: { auctionSession: { id: auctionSessionId } },
        order,
        select,
        relations: ["auctionSession"],
      }),
      this.auctionSessionHistoryRepository.count({ where: { auctionSession: { id: auctionSessionId } } }),
    ]);

    return { data, total };
  }
}

