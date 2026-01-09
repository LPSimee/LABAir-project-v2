import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductData } from '../interfaces/productData';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    constructor() { }

    private cartItems: ProductData[] = []; // the list of the selected products/items
    private cartLengthSource = new BehaviorSubject<number>(0); // Observable for the count of the selected products, it will receive number values

    /* NOTES:
        - The variables with the $ (Observables like youtube channels) are the one that the components are going to subscribe in order to get the data that they need(for now the selected product, the flag to show the blur and the length of the cart)
        - Observers for now: app-component, header-component, product-details-component and cart-popup-component 
    */

    // channel used by the header component
    cartLength$ = this.cartLengthSource.asObservable();

    // Observable to open the popup component
    private popupState = new BehaviorSubject<{ isOpen: boolean, data?: any }>({
        isOpen: false
    }); // data is not mandatory

    // In order to be used for every component we need the asObservable() call
    popupState$ = this.popupState.asObservable();

    // Method used to open the popup(called from product-details component)
    openPopup(product: ProductData) {
        this.cartItems.push(product); // to store the selected product(to change)

        // In order to add the new value that it will be shown for the listeners
        this.cartLengthSource.next(this.cartItems.length); // For the length of the cart
        this.popupState.next({
            isOpen: true,
            data: product
        }); // For the new selected product and to open the popup
    }

    // Method used to close the popup (from the "X" of the popup or from the click in the blur)
    closePopup() {
        this.popupState.next({ isOpen: false }); // To close the popup
    }
}
