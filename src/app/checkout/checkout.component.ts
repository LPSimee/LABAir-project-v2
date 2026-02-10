import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductData } from '../interfaces/productData';
import { NgForm } from '@angular/forms';
import { checkoutData } from '../interfaces/checkoutData';
import { paymentData } from '../interfaces/paymentData';

@Component({
    selector: 'app-checkout',
    standalone: false,
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
    constructor(private cartService: CartService) { }

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
        method: ""
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
    onSubmit(form: NgForm) {
        if (form.valid)
            this.paymentFlag = true;


        console.log("shippingData saved:", this.shippingData);
    }

    onFinalSubmit(form: NgForm) {
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

    checkCardType(e: Event) {
        if ((e.target as HTMLInputElement).value[0] == "4") {
            console.log("Icona VISA on");
            this.cardImgType = "visa";
            this.cardImgFlag = true;
        } else if ((e.target as HTMLInputElement).value[0] == "5" || (e.target as HTMLInputElement).value[0] == "2") {
            console.log("Icona Mastercard on");
            this.cardImgType = "mastercard";
            this.cardImgFlag = true;
        } else {
            this.cardImgFlag = false;
        }
        console.log((e.target as HTMLInputElement).value[0]);
        console.log("cardImgType: ", this.cardImgType);
    }

    trimCardNumber(): string {
        return this.paymentData.cardNumber.substring(0, 4);
    }

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
