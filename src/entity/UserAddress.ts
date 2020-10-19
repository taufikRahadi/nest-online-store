import {Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, ManyToOne} from "typeorm";
import { User } from "./User";

@Entity()
export class UserAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @Column({
    length: 50,
    nullable: false
  })
  address_name: string;

  @Column({
    type: 'text',
    nullable: false
  })
  address_detail: string;

  @Column({ nullable: false })
  province_id: number;

  @Column({ nullable: false })
  city_id: number;

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

  @ManyToOne(() => User, user => user.addresses)
  user: User
}
