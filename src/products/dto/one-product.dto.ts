import { ProductPicture } from "../../entity/ProductPicture";
import { ProductTag } from "../../entity/ProductTag";
import { ProductVariant } from "../../entity/ProductVariant";

export class OneProductDTO {
  id: number;
  code: string;
  name: string;
  stock: number;
  weight: number;
  price: number;
  categoryId: number;
  description: string;
  variants: ProductVariant[];
  product_tag: ProductTag[];
  pictures: ProductPicture[];
}
