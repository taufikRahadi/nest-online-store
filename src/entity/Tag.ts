import {Entity, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import { CategoryTagTemplate } from "./CategoryTagTemplate";
import { ProductTag } from "./ProductTag";
import { Product } from "./Product";

@Entity()
export class Tag extends CategoryTagTemplate {
  @OneToMany(() => ProductTag, products => products.tag)
  product_tag: ProductTag[];
}
