import { AuctionSession } from "src/module/auction-session/entities/auction-session.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AuctionSessionHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AuctionSession, (auctionSession) => auctionSession.history, { onDelete: "CASCADE" })
  auctionSession: AuctionSession;

  @Column()
  userId: number; // ID của người đấu giá

  @Column("decimal", { precision: 15, scale: 2 })
  bidAmount: number; // Giá đấu

  @CreateDateColumn()
  bidTime: Date; // Thời gian đặt giá
}
