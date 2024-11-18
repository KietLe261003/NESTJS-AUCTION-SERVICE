import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BiddingHistory {
  @PrimaryGeneratedColumn()
  bidHistoryID: number;

  @Column()
  @ApiProperty()
  auctionItemID: number;

  @Column()
  @ApiProperty()
  userID: number;

  @Column()
  @ApiProperty()
  bidAmount: number;

  @Column()
  @ApiProperty()
  bidTime: Date;

  @Column({ default: false })
  @ApiProperty()
  delflag: boolean;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  created_at: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  updated_at: Date;

  @Column('timestamp', { nullable: true })
  @ApiProperty()
  deleted_at: Date;
}
