import { ProductData } from "./productData";

export interface CartItem extends ProductData {
    id: string;
    quantita: number;
}