import { CartItem } from "./cartItem";
import { CheckoutData } from "./checkoutData";
import { PaymentData } from "./paymentData";

export interface Order {
    id: string;
    utente: CheckoutData;
    pagamento: PaymentData;
    prodotti: CartItem[];
    totale: number;
    dataOrdine: string;
}
