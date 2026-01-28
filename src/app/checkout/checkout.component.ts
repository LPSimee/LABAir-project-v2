import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductData } from '../interfaces/productData';
import { NgForm } from '@angular/forms';
import { checkoutData } from '../interfaces/checkoutData';

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

    userData: checkoutData;

    isPopupOpen: boolean = false;
    paymentFlag: boolean = false;
    verifyFlag: boolean = false;

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
    }

    // capire cosa e come portare alla sezione del pagamento
    onSubmit(form: NgForm) {
        if (form.valid) {
            this.userData = { ...form.value };
            this.userData.country = "Italia";
            this.paymentFlag = true;
        }

        console.log("userData saved: ", this.userData);
    }

    showPopup() {
        this.isPopupOpen = !this.isPopupOpen;
    }

    getItemTotalPrice(item: ProductData): number {
        return item.prezzo * item.quantita;
    }

    ngOnDestroy() {
        this.cartService.setCheckoutState(false);
    }
}
