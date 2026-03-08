import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductData } from '../interfaces/productData';
import { NgForm } from '@angular/forms';
import { checkoutData } from '../interfaces/checkoutData';
import { paymentData } from '../interfaces/paymentData';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { cc_number_format } from '../utils/string-utils';
import { cc_expires_format } from '../utils/string-utils';

@Component({
    selector: 'app-checkout',
    standalone: false,
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
    constructor(private cartService: CartService, private http: HttpClient, private router: Router) { }

    cartItems: ProductData[] = [];
    cartSubTotal: number = 0;

    shippingData: checkoutData = {
        email: "",
        name: "",
        surname: "",
        address: "",
        cap: "",
        city: "",
        country: "Italia",
        phone: ""
    };
    paymentData: paymentData = {
        method: "",
        cardNumber: "",
        cardDate: ""
    };

    popupFlag1: boolean = false;
    popupFlag2: boolean = false;
    popupFlag3: boolean = false;
    popupFlag4: boolean = false;
    paymentFlag: boolean = true;
    verifyFlag: boolean = true;

    cardImgFlag: boolean = false;
    cardImgType: string = "";

    ngOnInit() {
        this.cartService.cart$.subscribe(items => {
            this.cartItems = items;
        });
        console.log("Checkout");
        console.log("cartItems: ", this.cartItems);

        this.cartService.subtotal$.subscribe(subtotal => {
            this.cartSubTotal = subtotal
        });

        this.cartService.setCheckoutState(true);

        this.cardImgFlag = false;
        this.cardImgType = "";
    }

    // capire cosa e come portare alla sezione del pagamento
    saveShippingAddress(form: NgForm) {
        if (form.valid)
            this.paymentFlag = true;


        console.log("shippingData saved:", this.shippingData);
    }

    savePaymentMethod(form: NgForm) {
        if (form.valid) {
            this.paymentData = { ...this.paymentData, ...form.value };
            this.verifyFlag = true;

            console.log("Ordine pronto per verifica:", {
                utente: this.shippingData,
                pagamento: this.paymentData,
                prodotti: this.cartItems
            });
        }

    }

    // Rinominare onFinalSumbit o finalSumbit
    placeOrder() {
        // this.cartItems.forEach(item => {
        //     this.http.post(this.apiUrl, item).subscribe({
        //         next: (res) => console.log('Prodotto aggiunto al database del carrello', res),
        //         error: (err) => console.error('Errore', err)
        //     });
        // });

        //mandare sul thank-you page
        this.router.navigate(['/checkout/order-confirmed']);


        console.log("ao")
    }

    // Method used to open the popups with the '?'
    showPopup(popup: string) {
        switch (popup) {
            case 'subtotale':
                this.popupFlag1 = !this.popupFlag1;
                break;

            case 'paese-fatturazione':
                this.popupFlag2 = !this.popupFlag2;
                break;
            case 'gift-card':
                this.popupFlag3 = !this.popupFlag3;
                break;
            case 'trova-cvv':
                this.popupFlag4 = !this.popupFlag4;
                break;

            default:
                console.log("Popup non trovato");
        }
    }

    getItemTotalPrice(item: ProductData): number {
        return item.prezzo * item.quantita;
    }

    // Method used to remove non-numerical characters and format the card number with keyup event
    handleCardNumberKeyup(e: Event) {
        const input = e.target as HTMLInputElement;
        let value = input.value;

        const formatted = cc_number_format(input.value);

        input.value = formatted;
        this.paymentData.cardNumber = formatted;

        if (formatted[0] === "4") {
            this.cardImgType = "visa";
            this.cardImgFlag = true;
        } else if (formatted[0] === "5" || formatted[0] === "2") {
            this.cardImgType = "mastercard";
            this.cardImgFlag = true;
        } else {
            this.cardImgFlag = false;
        }
    }

    // Method used to check the expiration date
    checkDate(e: Event): void {
        const input = e.target as HTMLInputElement;
        input.value = cc_expires_format(input.value);
        this.paymentData.cardDate = input.value;
    }

    // Method used to show the first four number of the credit card number
    trimCardNumber(): string {
        return this.paymentData.cardNumber.substring(0, 4);
    }

    // Methods used to return to the inputs of the forms
    modifyShippingForm() {
        this.paymentFlag = false;
        this.verifyFlag = false;
    }
    modifyPaymentForm() {
        this.verifyFlag = false;
    }

    ngOnDestroy() {
        this.cartService.setCheckoutState(false);
    }
}
