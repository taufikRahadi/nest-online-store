import { ProductVariantDTO } from "./product-variant.dto";
import { ProductTag } from "../../entity/ProductTag";
import { ProductTagDTO } from "./product-tag.dto";
import { ProductPictureDTO } from "./product-picture.dto";

export class CreateProductDTO {
  name: string;
  stock: number;
  weight: number;
  price: number;
  categoryId: number;
  description: string;
  variants: ProductVariantDTO[];
  tags: ProductTagDTO[];
  pictureUrl: any;
}
