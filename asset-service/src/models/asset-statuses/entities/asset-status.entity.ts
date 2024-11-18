import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AssetStatus {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'ID of asset status'
  })
  assetStatusID: number;

  @Column()
  @ApiProperty({
    example: 'asset status name 1',
    name: 'The name of the asset status'
  })
  assetStatusName: string;

  @Column({ default: false, nullable: false })
  @ApiProperty({
    example: false,
    description: 'Status delete of asset status'
  })
  delflag: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    example: Date.now()
  })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    example: Date.now()
  })
  updated_at: Date;

  @Column('timestamp', { nullable: true })
  @ApiProperty({})
  deleted_at: Date;
}
