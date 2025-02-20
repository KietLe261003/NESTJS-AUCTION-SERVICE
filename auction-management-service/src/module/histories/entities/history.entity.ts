import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class History {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  historyId: number;

  @Column()
  @ApiProperty()
  userId: number;

  @Column()
  @ApiProperty()
  bidHistoryId: number;

  @Column()
  @ApiProperty()
  billId: number;

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
