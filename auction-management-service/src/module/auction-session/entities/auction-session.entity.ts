import { AuctionSessionHistory } from "src/module/auction-session-history/entities/auction-session-history.entity";
import { AuctionUser } from "src/module/auction-users/entities/auction-user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class AuctionSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Tên phiên đấu giá (cũng là tên sản phẩm)

  @Column({ type: 'timestamp' })
  startTime: Date; // Thời gian bắt đầu

  @Column({ type: 'timestamp' })
  endTime: Date; // Thời gian kết thúc

  @Column({ type: 'int' })
  paymentDeadline: number; // Thời gian thanh toán (số phút hoặc giây)

  @Column()
  assetId: number; // Mã tài sản

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  depositFee: number; // Phí tham gia đấu giá

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  bidStep: number; // Bước giá tối thiểu

  @Column({ default: false })
  isDelete: boolean

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date

  @OneToMany(() => AuctionSessionHistory, (auctionSessionHistory) => auctionSessionHistory.auctionSession)
  history: AuctionSessionHistory[]

  @OneToMany(() => AuctionUser, (auctionUser) => auctionUser.auctionSession, { cascade: true })
  users: AuctionUser[]
}
