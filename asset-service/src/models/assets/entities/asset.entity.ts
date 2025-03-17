
import { Image } from 'src/models/images/entities/image.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

export enum AssetStatus {
  AVAILABLE = 'available',
  SOLD = 'sold',
  PENDING = 'pending',
  UNAVAILABLE = 'unavailable',
}

@Entity()
export class Asset {
  @PrimaryGeneratedColumn()
  assetID: number;

  @Column({ nullable: true })
  userID: number; // must check at api-gateway

  @Column(
    {
      type: 'enum',
      enum: AssetStatus,
      default: AssetStatus.PENDING,
    }
  )
  status: AssetStatus;

  @Column({ type: 'text', nullable: true })
  reason?: string;

  @Column()
  assetName: string;

  @Column()
  mainImage: string;

  @Column('text')
  assetDescription: string;

  @Column()
  assetPrice: number;

  @Column()
  address: string;

  @Column({ nullable: true })
  inspectorID: number; // must check at api-gateway

  @Column({ nullable: true })
  assetTypeID: number;

  @Column({ nullable: true })
  assetStatusID: number;

  @Column({ default: false })
  delflag: boolean;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column('timestamp', { nullable: true })
  deleted_at: Date;

  @OneToMany(() => Image, image => image.asset, { cascade: true })
  images: Image[];
}

