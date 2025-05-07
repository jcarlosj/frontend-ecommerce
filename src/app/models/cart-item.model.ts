import { DataProduct } from "./product.model";

export interface CartItem {
  product: DataProduct;
  cartQuantity: number;
}
