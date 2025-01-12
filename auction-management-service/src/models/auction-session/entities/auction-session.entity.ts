import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AuctionSession {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  auctionSessionID: number;

  @Column()
  @ApiProperty()
  startTime: Date;

  @Column()
  @ApiProperty({ nullable: true })
  endTime: Date;

  @Column()
  @ApiProperty()
  eventID: number;

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
