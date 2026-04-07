import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ProductData } from '../interfaces/productData';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../interfaces/cartItem';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    /* URL and enpoints
    http://localhost:3000/carrello, getAll / post
    http://localhost:3000/carrello/id, patch, delete
    */
    private apiCartURL = "http://localhost:3000/carrello";

    constructor(private httpClient: HttpClient) {
        this.loadCart();
    }

    private cartItems = new BehaviorSubject<CartItem[]>([]); // the list of the selected products/items

    private popupState = new BehaviorSubject<{ isOpen: boolean, data?: any }>({
        isOpen: false
    }); // Observable to open the popup component, data is not mandatory
    private checkoutState = new BehaviorSubject<boolean>(
        false
    );

    // In order to be used by every component we need the asObservable() call
    cart$ = this.cartItems.asObservable();
    popupState$ = this.popupState.asObservable();
    subtotal$ = this.cart$.pipe(
        map(items => items.reduce((acc, item) => acc + (item.prezzo * item.quantita), 0))
    ); // this one uses the cartItems channel to make this operation
    checkoutState$ = this.checkoutState.asObservable();

    // Method used to open the popup(called from product-details component)
    openPopup(product: ProductData) {
        this.addItemToCart(product); // to store the selected product

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

    setCheckoutState(state: boolean) {
        this.checkoutState.next(state);
    }

    // REST API methods
    // Method to get all the Items of the cart
    getAllItems(): Observable<CartItem[]> {
        return this.httpClient.get<CartItem[]>(`${this.apiCartURL}`);
    }

    // Add new item rest api
    addNewItem(item: CartItem): Observable<Object> {
        return this.httpClient.post(`${this.apiCartURL}`, item);
    }

    // Update Cart item quantity rest api
    updateItemQuantity(itemId: string, quantita: number): Observable<Object> {
        return this.httpClient.patch(`${this.apiCartURL}/${itemId}`, { quantita });
    }

    // Delete cart item rest api
    deleteItem(itemId: string): Observable<Object> {
        return this.httpClient.delete(`${this.apiCartURL}/${itemId}`);
    }

    // Method used to add a new item of add + 1 in the quantity of the selected item
    addItemToCart(product: ProductData) {
        const currentItems = this.cartItems.value;
        const id = `${product.productId}_${product.colore.toLocaleLowerCase()}_${product.taglia}`;
        const itemIndex = currentItems.findIndex(item =>
            item.id === id
        );

        if (itemIndex > -1) {
            const updatedItems = [...currentItems];

            updatedItems[itemIndex] = {
                ...updatedItems[itemIndex],
                quantita: updatedItems[itemIndex].quantita + 1
            };

            this.updateItemQuantity(id, updatedItems[itemIndex].quantita).subscribe({
                next: () => this.cartItems.next(updatedItems),
                error: (err) => console.log("Errore nell'aggiornamento dell'item:", err)
            });

        } else {
            const newItem: CartItem = { id, ...product, quantita: 1 };

            this.addNewItem(newItem).subscribe({
                next: () => this.cartItems.next([...currentItems, newItem]),
                error: (err) => console.log("Errore nel caricamento del nuovo item:", err)
            });
        }
    }

    // Method used to remove the quantity of the selected item by 1
    removeItemFromCart(cartItem: CartItem) {
        const currentItems = this.cartItems.value;
        const itemIndex = currentItems.findIndex(item =>
            item.id === cartItem.id
        );

        if (itemIndex === -1) return;

        const item = currentItems[itemIndex]; // Selected item

        if (item.quantita > 1) {
            const updatedItems = [...currentItems];
            updatedItems[itemIndex] = {
                ...item,
                quantita: item.quantita - 1
            };

            this.updateItemQuantity(item.id, updatedItems[itemIndex].quantita).subscribe({
                next: () => this.cartItems.next(updatedItems),
                error: (err) => console.log("Errore nell'aggiornamento dell'item:", err)
            });

        } else {
            // if quantity = 1 
            this.deleteItemFromCart(cartItem);
        }
    }

    // Method used to delete the selected item (quantity = 1)
    deleteItemFromCart(cartItem: CartItem) {
        const updatedItems = this.cartItems.value.filter(item => item.id !== cartItem.id);

        this.deleteItem(cartItem.id).subscribe({
            next: () => this.cartItems.next(updatedItems),
            error: (err) => console.log("Errore nell'eliminazione dell'item:", err)
        });
    }

    // Method used to load cart data from the json file
    private loadCart(): void {
        this.getAllItems().subscribe({
            next: (items) => this.cartItems.next(items),
            error: (err) => {
                console.error("Errore nel caricamento del cart:", err)
                this.cartItems.next([]);
            }
        });
    }
}
