import {Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, ManyToOne, OneToOne, JoinTable} from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false
  })
  orderId: number;
  
  @Column({
    nullable: false
  })
  productId: number;

  @Column({
    unsigned: true,
    nullable: false
  })
  qty: number;

  @Column({
    nullable: false,
    unsigned: true
  })
  total_price: number;

  @Column({
    nullable: false,
    unsigned: true
  })
  total_weight: number;

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

  @ManyToOne(() => Order, order => order.details)
  order: Order

  @OneToOne(type => Product)
  product: Product

}
