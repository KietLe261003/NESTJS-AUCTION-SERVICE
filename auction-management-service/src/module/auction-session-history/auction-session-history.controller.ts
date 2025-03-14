
import { Controller, Get, Post, Body, Param, Query, Delete, ParseIntPipe } from "@nestjs/common";
import { AuctionSessionHistoryService } from "./auction-session-history.service";
import { ApiOperation, ApiQuery } from "@nestjs/swagger";
import { CreateAuctionSessionHistoryDto } from "./dto/create-auction-session-history.dto";

@Controller("auction-management-service/auction-session-history")
export class AuctionSessionHistoryController {
  constructor(private readonly auctionSessionHistoryService: AuctionSessionHistoryService) { }

  @Post()
  @ApiOperation({ summary: "Create a new auction session history entry" })
  async create(
    @Body() createAutionSessionHistoryDto: CreateAuctionSessionHistoryDto
  ): Promise<ApiResponseMeta> {
    const newHistoryEntry = await this.auctionSessionHistoryService.createHistoryEntry(createAutionSessionHistoryDto.auctionSessionId, createAutionSessionHistoryDto.userId, createAutionSessionHistoryDto.bidAmount);
    return {
      code: 201,
      message: "CREATED",
      metadata: {
        historyEntry: newHistoryEntry,
      },
    };
  }

  @Get()
  @ApiOperation({ summary: "Retrieve a paginated list of auction session history" })
  @ApiQuery({
    name: "page",
    required: false,
    type: Number,
    description: "Page number for pagination (default: 1)",
    example: 1,
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: Number,
    description: "Number of records per page (default: 10)",
    example: 10,
  })
  // @ApiQuery({
  //   name: 'filter',
  //   required: false,
  //   type: String,
  //   description: 'JSON stringified object for filtering results by specific fields',
  //   example: '{ "auctionSessionId": "1"}',
  // })
  @ApiQuery({
    name: 'order',
    required: false,
    type: String,
    description: 'JSON stringified object to specify sorting order of results',
    example: '{"bidAmount": "DESC"}',
  })
  @ApiQuery({
    name: 'select',
    required: false,
    type: String,
    description: 'JSON stringified array of fields to include in the result',
    example: '["id","bidAmount", "userId"]',
  })
  async findAll(
    @Query("page", ParseIntPipe) page: number = 1,
    @Query("limit", ParseIntPipe) limit: number = 10,
    @Query('filter') filter: any = {},
    @Query('order') order: any = {},
    @Query('select') select: any = {}
  ): Promise<ApiResponseMeta> {
    const parsedFilter = typeof filter === 'string' ? JSON.parse(filter) : filter;
    const parsedOrder = typeof order === 'string' ? JSON.parse(order) : order;
    const parsedSelect = typeof select === 'string' ? JSON.parse(select) : select;

    const result = await this.auctionSessionHistoryService.findAll(page, limit, parsedFilter, parsedOrder, parsedSelect);
    return {
      code: 200,
      message: "OK",
      metadata: {
        historyEntries: result.data,
        total: result.total,
        page,
        lastPage: Math.ceil(result.total / limit),
      },
    };
  }

  @Get("auction-session/:auctionSessionId")
  @ApiOperation({ summary: "Retrieve auction history by auctionSessionId" })
  @ApiQuery({
    name: "page",
    required: false,
    type: Number,
    description: "Page number for pagination (default: 1)",
    example: 1,
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: Number,
    description: "Number of records per page (default: 10)",
    example: 10,
  })
  @ApiQuery({
    name: "order",
    required: false,
    type: String,
    description: "JSON stringified object to specify sorting order of results",
    example: '{"bidTime": "DESC"}',
  })
  @ApiQuery({
    name: "select",
    required: false,
    type: String,
    description: "JSON stringified array of fields to include in the result",
    example: '["id", "userId", "bidAmount", "bidTime"]',
  })
  async findByAuctionSessionId(
    @Param("auctionSessionId", ParseIntPipe) auctionSessionId: number,
    @Query("page", ParseIntPipe) page: number = 1,
    @Query("limit", ParseIntPipe) limit: number = 10,
    @Query("order") order: any = {},
    @Query("select") select: any = {}
  ): Promise<ApiResponseMeta> {
    const parsedOrder = typeof order === "string" ? JSON.parse(order) : order;
    const parsedSelect = typeof select === "string" ? JSON.parse(select) : select;

    const result = await this.auctionSessionHistoryService.findByAuctionSessionId(auctionSessionId, page, limit, parsedOrder, parsedSelect);
    return {
      code: 200,
      message: "OK",
      metadata: {
        historyEntries: result.data,
        total: result.total,
        page,
        lastPage: Math.ceil(result.total / limit),
      },
    };
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete an auction session history entry by ID" })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<ApiResponseMeta> {
    await this.auctionSessionHistoryService.remove(id);
    return {
      code: 200,
      message: "OK",
      metadata: null,
    };
  }
}

