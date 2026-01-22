import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductData } from '../interfaces/productData';

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

    isPopupOpen: boolean = false;

    ngOnInit() {
        this.cartService.cart$.subscribe(items => {
            this.cartItems = items;
        });
        console.log("Stiamo sul checkout!");
        console.log("cartItems: ", this.cartItems);

        this.cartService.subtotal$.subscribe(subtotal => {
            this.cartSubTotal = subtotal
        })
    }

    showPopup() {
        this.isPopupOpen = !this.isPopupOpen;
    }
}
