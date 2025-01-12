
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  inventoryID: number;

  @Column()
  quantity: number;

  @Column('timestamp')
  entryTime: Date;

  @Column('timestamp', { nullable: true }) // Để giá trị null nếu không có thời gian cụ thể
  exitTime: Date;

  @Column()
  warehouseID: number;

  @Column()
  assetID: number;

  @Column({ type: 'boolean', default: false })
  delflag: boolean;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column('timestamp', { nullable: true })
  deleted_at: Date;
}

