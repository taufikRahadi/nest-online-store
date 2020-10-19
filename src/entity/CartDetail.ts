import {Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, ManyToOne, ManyToMany} from "typeorm";
import { Cart } from "./Cart";
import { Product } from "./Product";

@Entity()
export class CartDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  cartId: number;
  
  @Column({ nullable: false })
  productId: number;

  @Column({ nullable: false, unsigned: true })
  qty: number;

  @Column({ nullable: false, unsigned: true })
  total_price: number;

  @Column({ nullable: false, unsigned: true })
  total_weight: number;

  @Column({
    nullable: false,
    default: false
  })
  is_paid: boolean;

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

  @ManyToOne(() => Cart, cart => cart.details, {
    eager: true
  })
  cart: Cart

  @ManyToOne(() => Product, product => product.cart_details, {
    eager: true
  })
  product: Product
}
