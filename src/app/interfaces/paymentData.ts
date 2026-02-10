export interface paymentData {
    method: "" | "carta" | "paypal" | "gpay";
    cardNumber?: string;
    cardDate?: string;
    cardCVV?: string;
}