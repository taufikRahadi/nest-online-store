import {Entity, PrimaryGeneratedColumn, Column, Generated, DeleteDateColumn, OneToMany, ManyToMany, ManyToOne} from "typeorm";
import { OrderDetail } from "./OrderDetail";
import { Payment } from "./Payment";
import { User } from "./User";

@Entity()
export class Order {  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  userId: number;

  @Column({
    type: 'uuid',
    unique: true,
    nullable: false
  })
  @Generated('uuid')
  code: string;

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

  @ManyToOne(() => User, user => user.orders)
  user: User

  @OneToMany(() => OrderDetail, details => details.order, {
    eager: true
  })
  details: OrderDetail[]

  @OneToMany(() => Payment, payment => payment.order, {
    eager: true
  })
  payment: Payment[]
}
