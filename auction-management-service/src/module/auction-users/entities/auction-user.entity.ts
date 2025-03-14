import { AuctionSession } from "src/module/auction-session/entities/auction-session.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AuctionUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number

  @ManyToOne(() => AuctionSession, (auctionSession) => auctionSession.users, { onDelete: 'CASCADE' })
  auctionSession: AuctionSession
}
