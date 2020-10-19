import {Entity, PrimaryGeneratedColumn, Generated, Column, DeleteDateColumn, OneToOne, JoinColumn, ManyToOne, OneToMany, ManyToMany} from "typeorm";
import { type } from "os";
import { ProductCategory } from "./ProductCategory";
import { ProductTag } from "./ProductTag";
import { CartDetail } from "./CartDetail";
import { ProductVariant } from "./ProductVariant";
import { ProductPicture } from "./ProductPicture";

@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'uuid',
    unique: true,
    nullable: false
  })
  @Generated('uuid')
  code: string;

  @Column({ length: 50 })
  name: string;

  @Column({ unsigned: true })
  stock: number
  
  @Column({ unsigned: true })
  weight: number

  @Column({ unsigned: true })
  price: number

  @Column()
  description: string;

  @Column()
  categoryId: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false
  })
  created_at: string;
  
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false
  })
  updated_at: string;

  @DeleteDateColumn({
    type: 'timestamp',
  })
  deleted_at: string;

  @ManyToOne(() => ProductCategory, category => category.products, {
    eager: true,
  })
  category: ProductCategory;

  @OneToMany(() => ProductTag, tags => tags.product, {
    eager: true,
    cascade: ['insert', 'remove', 'soft-remove']
  })
  public product_tag: ProductTag[];

  @OneToMany(() => CartDetail, cart_details => cart_details.product)
  cart_details: CartDetail[];

  @OneToMany(() => ProductVariant, variants => variants.product, {
    eager: true,
    cascade: ['insert', 'remove', 'soft-remove']
  })
  public variants: ProductVariant[];

  @OneToMany(() => ProductPicture, pictures => pictures.product, {
    eager: true,
    cascade: ['insert', 'soft-remove', 'remove', 'update'],
  })
  pictures: ProductPicture[];

}
