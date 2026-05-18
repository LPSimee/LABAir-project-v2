import { CartItem } from "./cartItem";
import { CheckoutData } from "./checkoutData";
import { Order } from "./order";
import { Product } from "./product";

export interface User {
    id: number;
    email: string;
    nome: string;
    cognome: string;
    checkoutData?: CheckoutData;
    carrello: CartItem[];
    ordini?: Order[];
    preferiti?: Product[];
}