import {Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, OneToOne, JoinColumn, OneToMany} from "typeorm";
import { User } from "./User";
import { CartDetail } from "./CartDetail";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

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

  @OneToOne(type => User)
  @JoinColumn()
  user: User

  @OneToMany(() => CartDetail, details => details.cart)
  details: CartDetail[]
}
