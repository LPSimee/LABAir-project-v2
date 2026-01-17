import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductData } from '../interfaces/productData';

@Component({
    selector: 'app-cart',
    standalone: false,
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss'
})
export class CartComponent {
    constructor(private cartService: CartService) { }

    cartItems: ProductData[] = [];

    totalPrice: number = 0;
    itemCount: number = 0;
    noItemsFlag: boolean = false;
    isPopupOpen: boolean = false;

    ngOnInit() {

        // In order to change the number of items and the price in the html we're going to calculate these values in the subscription
        this.cartService.cart$.subscribe(data => {
            this.cartItems = data;

            // To show the message alert
            if (this.cartItems.length === 0)
                this.noItemsFlag = true;

            // In order to calculate the total price
            // I wanted to use the for of but this is just one line of code
            this.totalPrice = this.cartItems.reduce((acc, item) => acc + (item.prezzo * item.quantita), 0);

            console.log("Updated price= ", this.totalPrice);
        });
    }

    // Method used to add the quantity of the selected item by 1
    addCartItem(selectedItem: ProductData) {
        this.cartService.addToCart(selectedItem);
    }

    // Method used to substract 1 or to delete the item from the cart
    removeCartItem(selectedItem: ProductData, itemQuantity: number) {
        if (itemQuantity > 1) {
            this.cartService.removeOneItem(selectedItem);
        } else {
            this.cartService.deleteFromCart(selectedItem);
        }
    }

    // Method used to open the popup of "?" button next to "Subtotale"
    showPopup() {
        this.isPopupOpen = !this.isPopupOpen;
    }
}
