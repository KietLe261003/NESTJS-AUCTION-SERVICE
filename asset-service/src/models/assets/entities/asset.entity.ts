
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Asset {
  @PrimaryGeneratedColumn()
  assetID: number;

  @Column()
  assetName: string;

  @Column()
  mainImage: string;

  @Column('text')
  assetDescription: string;

  @Column()
  assetPrice: number;

  @Column()
  inspectorID: number; // must check at api-gateway

  @Column()
  assetTypeID: number;

  @Column()
  assetStatusID: number;

  @Column({ default: false })
  delflag: boolean;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column('timestamp', { nullable: true })
  deleted_at: Date;
}

