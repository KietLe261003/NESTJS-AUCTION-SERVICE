import { Asset } from "src/models/assets/entities/asset.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  url: string

  @ManyToOne(() => Asset, asset => asset.images, { onDelete: 'CASCADE' })
  asset: Asset
}
