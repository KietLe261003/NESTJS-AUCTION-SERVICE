
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  eventId: number;

  @Column()
  eventName: string;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column()
  eventState: string;

  @Column()
  description: string;

  @Column({ default: false })
  delflag: boolean;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;


  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;


  @Column('timestamp', { nullable: true })
  deleted_at: Date;
}

