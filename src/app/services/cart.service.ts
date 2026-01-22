import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ProductData } from '../interfaces/productData';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    constructor() { }

    // removed cartLengthSource and cartLength$
    private cartItems = new BehaviorSubject<any[]>(this.loadFromStorage()); // the list of the selected products/items
    private popupState = new BehaviorSubject<{ isOpen: boolean, data?: any }>({
        isOpen: false
    }); // Observable to open the popup component, data is not mandatory

    // In order to be used by every component we need the asObservable() call
    cart$ = this.cartItems.asObservable();
    popupState$ = this.popupState.asObservable();
    subtotal$ = this.cart$.pipe(
        map(items => items.reduce((acc, item) => acc + (item.prezzo * item.quantita), 0))
    ); // this one uses the cartItems channel to make this operation

    // Method used to open the popup(called from product-details component)
    openPopup(product: ProductData) {
        this.addToCart(product); // to store the selected product

        // In order to add the new value that it will be shown for the listeners
        this.popupState.next({
            isOpen: true,
            data: product
        }); // For the new selected product and to open the popup
    }

    // Method used to close the popup (from the "X" of the popup or from the click in the blur)
    closePopup() {
        this.popupState.next({ isOpen: false }); // To close the popup
    }

    // Method used to add a new item of add + 1 in the quantity of the selected item
    addToCart(product: ProductData) {
        const currentItems = this.cartItems.value; // The array cart

        // Let's find the index considering the color and shoe size too
        const itemIndex = currentItems.findIndex(item =>
            item.id === product.id &&
            item.colore === product.colore &&
            item.taglia === product.taglia
        );

        if (itemIndex > -1) {
            // In case we found the match, we'll create a copy of the array with the selected item quantity incremented by 1
            const updatedItems = [...currentItems];

            updatedItems[itemIndex] = {
                ...updatedItems[itemIndex],
                quantita: updatedItems[itemIndex].quantita + 1
            };


            this.updateCart(updatedItems);
        } else {
            // Let's add the new item by copying the product and updating quantity=1
            const newItem = { ...product, quantita: 1 };
            this.updateCart([...currentItems, newItem]);
        }
    }

    // Method used to remove the quantity of the selected item by 1
    removeOneItem(product: ProductData) {
        const currentItems = this.cartItems.value;

        // Search of the index
        const itemIndex = currentItems.findIndex(item =>
            item.id === product.id &&
            item.colore === product.colore &&
            item.taglia === product.taglia
        );

        // In case the index is not found, return
        if (itemIndex === -1) return;

        const item = currentItems[itemIndex]; // Selected item

        if (item.quantita > 1) {

            const updatedItems = [...currentItems];
            updatedItems[itemIndex] = {
                ...item,
                quantita: item.quantita - 1
            };
            this.updateCart(updatedItems);
            console.log("Quantità diminuita");
        } else {
            // if quantity = 0
            this.deleteFromCart(item);
            console.log("Prodotto rimosso: ", item.nome);
        }
    }

    // Method used to delete the selected item (quantity = 0)
    deleteFromCart(product: ProductData) {
        const updatedItems = this.cartItems.value.filter(item => !(item.id === product.id &&
            item.colore === product.colore &&
            item.taglia === product.taglia)); // We filter the cart in order to remove the selected item 
        this.updateCart(updatedItems);
    }

    // Method used to notify the components and to add/update the cart in the localStorage
    private updateCart(items: ProductData[]) {
        this.cartItems.next(items); // Let's add the new modified cart
        localStorage.setItem('cart-shoe-data', JSON.stringify(items)); // In order to save the data for now we're using the localStorage of the browser
    }

    // Method used to load existing cart data from the localStorage
    private loadFromStorage(): ProductData[] {
        const saved = localStorage.getItem('cart-shoe-data'); // getItem is the method used to extract the existing data 
        return saved ? JSON.parse(saved) : [];
    }
}
