import {Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, ManyToOne} from "typeorm";
import { Product } from "./Product";
import { Tag } from "./Tag";

@Entity()
export class ProductTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false
  })
  productId: number;

  @Column({
    nullable: false
  })
  tagId: number;

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

  @ManyToOne(() => Tag, tag => tag.product_tag, {
    eager: true
  })
  tag: Tag;

  @ManyToOne(() => Product, product => product.product_tag)
  product: Product
}
