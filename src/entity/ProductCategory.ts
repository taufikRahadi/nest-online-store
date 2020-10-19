import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { CategoryTagTemplate } from "./CategoryTagTemplate";
import { Product } from "./Product";

@Entity()
export class ProductCategory extends CategoryTagTemplate {
  
  @OneToMany(() => Product, products => products.category)
  products: Product[]

}
