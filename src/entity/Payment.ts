import {Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, ManyToOne} from "typeorm";
import { Order } from "./Order";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false
  })
  transaction_token: string;

  @Column({
    nullable: false
  })
  orderId: number;

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

  @ManyToOne(() => Order, order => order.payment)
  order: Order
}
