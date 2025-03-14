import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuctionUsersService } from './auction-users.service';
import { CreateAuctionUserDto } from './dto/create-auction-user.dto';
import { UpdateAuctionUserDto } from './dto/update-auction-user.dto';

@Controller('auction-users')
export class AuctionUsersController {
  constructor(private readonly auctionUsersService: AuctionUsersService) {}

  @Post()
  create(@Body() createAuctionUserDto: CreateAuctionUserDto) {
    return this.auctionUsersService.create(createAuctionUserDto);
  }

  @Get()
  findAll() {
    return this.auctionUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auctionUsersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuctionUserDto: UpdateAuctionUserDto) {
    return this.auctionUsersService.update(+id, updateAuctionUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.auctionUsersService.remove(+id);
  }
}
