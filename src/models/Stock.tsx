import { UUID } from "crypto";
import { Product } from "./Product";
import { Size } from "./Size";

export interface Stock {
    id: UUID,
    product: Product,
    size: Size,
    quantityInStock: number
}
