export interface PaymentData {
    method: "" | "carta" | "paypal" | "gpay";
    cardNumber?: string;
    cardDate?: string;
    cardCVV?: string;
}