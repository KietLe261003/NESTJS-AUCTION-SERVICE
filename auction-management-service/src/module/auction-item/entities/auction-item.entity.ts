
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AuctionItem {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'ID của mục đấu giá' })
  auctionItemId: number;

  @ApiProperty({ example: 101, description: 'ID của phiên đấu giá' })
  @Column()
  auctionSessionId: number;

  @ApiProperty({ example: 5001, description: 'ID của tài sản đấu giá' })
  @Column()
  assetId: number;

  @ApiProperty({ example: 1000, description: 'Giá khởi điểm' })
  @Column()
  startingBids: number;

  @ApiProperty({ example: 50, description: 'Bước giá đấu' })
  @Column()
  bidIncrement: number;

  @ApiProperty({ example: false, description: 'Cờ đánh dấu đã xóa' })
  @Column({ default: false })
  delflag: boolean;

  @ApiProperty({ example: '2024-11-11T00:00:00.000Z', description: 'Thời điểm tạo' })
  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ApiProperty({ example: '2024-11-11T12:00:00.000Z', description: 'Thời điểm cập nhật' })
  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ApiProperty({ example: null, description: 'Thời điểm xóa (null nếu chưa xóa)' })
  @Column('timestamp', { nullable: true })
  deleted_at: Date;
}

