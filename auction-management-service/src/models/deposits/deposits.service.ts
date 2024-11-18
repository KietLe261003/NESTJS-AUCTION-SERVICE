import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Deposit } from './entities/deposit.entity';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { AuctionSessionService } from '../auction-session/auction-session.service';

@Injectable()
export class DepositsService {
  constructor(
    @InjectRepository(Deposit) private readonly repository: Repository<Deposit>,
    private readonly auctionSessionService: AuctionSessionService
  ) { }
  async create(createDepositDto: CreateDepositDto): Promise<Deposit> {
    const auctionSession = await this.auctionSessionService.findOne(createDepositDto.auctionSessionId)
    if (!auctionSession) throw new HttpException({
      code: 404,
      message: `Auction session with ID ${createDepositDto.auctionSessionId} not found`,
      metadata: null
    }, HttpStatus.NOT_FOUND);

    const createdDeposit = this.repository.create(createDepositDto)
    const savedDeposit = await this.repository.save(createdDeposit)

    const deposit = await this.findOne(savedDeposit.depositId)
    return deposit
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    filter: FindOptionsWhere<Deposit> = {},
    order: FindOptionsOrder<Deposit> = {},
    select: (keyof Deposit)[] = ['depositId', 'auctionSessionId', 'userId', 'depositAmount']
  ): Promise<{ data: Partial<Deposit>[]; total: number }> {
    const [data, total] = await Promise.all([
      this.repository.find({
        skip: (page - 1) * limit,
        take: limit,
        where: filter,
        order: order,
        select: select,
      }),
      this.repository.count({ where: filter }),
    ]);

    return { data, total };
  }

  async findOne(id: number): Promise<Deposit> {
    const deposit = await this.repository.findOne({ where: { depositId: id } })
    if (!deposit) throw new HttpException(
      {
        code: 404,
        message: `Deposit with ID ${id} not found`,
        metadata: null,
      },
      HttpStatus.NOT_FOUND
    );
    return deposit
  }

  async update(id: number, updateDepositDto: UpdateDepositDto): Promise<Deposit> {
    const updatting = await this.repository.update({ depositId: id }, updateDepositDto)
    if (!updatting) {
      throw new HttpException(
        {
          code: 404,
          message: `Deposit with ID ${id} not found`,
          metadata: null,
        },
        HttpStatus.NOT_FOUND
      );
    }
    const updatedDeposit = await this.findOne(id)
    return updatedDeposit
  }

  async remove(id: number): Promise<Boolean> {
    const result = await this.repository.delete({ auctionSessionId: id })
    if (result.affected === 0) {
      throw new HttpException(
        {
          code: 404,
          message: `Deposit with ID ${id} not found`,
          metadata: null,
        },
        HttpStatus.NOT_FOUND
      );
    }
    return true;
  }
}
