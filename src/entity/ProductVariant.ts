import {Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, ManyToOne} from "typeorm";
import { Product } from "./Product";

@Entity()
export class ProductVariant {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false
  })
  productId: number;

  @Column({
    nullable: true,
  })
  color: string;

  @Column({
    nullable: true
  })
  size: number;

  @Column({
    nullable: true
  })
  materials: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false
  })
  created_at: string;
  
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: false
  })
  updated_at: string;

  @DeleteDateColumn({
    type: 'timestamp',
  })
  deleted_at: string;

  @ManyToOne(() => Product, product => product.variants)
  product: Product

}
