import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ImageAsset {
  @PrimaryGeneratedColumn()
  imageID: number

  @Column()
  assetID: number

  @Column()
  imageAsset: string

  @Column({ default: false, nullable: false })
  delflag: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column('timestamp', { nullable: true })
  deleted_at: Date;

}
