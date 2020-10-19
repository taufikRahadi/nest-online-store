import {Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, ManyToOne, AfterLoad} from "typeorm";
import { Product } from "./Product";

@Entity()
export class ProductPicture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false
  })
  productId: number;

  @Column()
  title: string;

  @Column()
  pictureUrl: string;

  @Column()
  link: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
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

  @ManyToOne(() => Product, product => product.pictures)
  product: Product;

  @AfterLoad()
  pictureFullUrl() {
    this.pictureUrl = 'http://localhost:3000/img/products/' + this.pictureUrl;
  }
}
