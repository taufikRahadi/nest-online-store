import {Entity, PrimaryGeneratedColumn, Column, Generated, DeleteDateColumn, OneToOne, OneToMany} from "typeorm";
import { Cart } from "./Cart";
import { Order } from "./Order";
import { UserAddress } from "./UserAddress";
import { IsString, IsNotEmpty, IsAlpha, IsHash, IsEmail, IsPhoneNumber } from 'class-validator';

type userRole = "user" | "admin";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'uuid',
        unique: true,
        nullable: false
      })
    @Generated('uuid')
    code: string;

    @Column({
        nullable: false,
        length: 50
    })
    @IsString()
    @IsNotEmpty()
    firstname: string;

    @Column({
        nullable: true,
        length: 50
    })
    lastname: string;

    @Column({
        unique: true,
        length: 50
    })
    @IsAlpha()
    username: string;

    @Column({
        unique: true,
        length: 100
    })
    @IsEmail()
    email: string;

    @Column({
        nullable: false,
        select: false
    })
    password: string;
    
    @Column({
        unique: true,
        length: 16
    })
    @IsPhoneNumber('ID')
    phonenumber: string;

    @Column({
        type: 'enum',
        enum: ['user', 'admin'],
        default: 'user',
        nullable: false
    })
    role: userRole;

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

    @OneToOne(type => Cart)
    cart: Cart;

    @OneToMany(() => Order, orders => orders.user)
    orders: Order[]

    @OneToMany(() => UserAddress, addresses => addresses.user, {
        eager: true
    })
    addresses: UserAddress[]

}
