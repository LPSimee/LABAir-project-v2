import { Component, EventEmitter, Output } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductData } from '../interfaces/productData';
import { timer, Subscription } from 'rxjs';

@Component({
    selector: 'app-cart-popup',
    standalone: false,
    templateUrl: './cart-popup.component.html',
    styleUrl: './cart-popup.component.scss'
})
export class CartPopupComponent {

    @Output() blurChange = new EventEmitter<boolean>();

    onMenuOpen() {
        this.blurChange.emit(true);
    }

    onMenuClose() {
        this.blurChange.emit(false);
    }

    isVisible = false;

    // cartProduct: ProductData[] = [];
    cartItem: ProductData = null;
    itemCount: number = 0; // Number of item selected

    private timerSub: Subscription | null = null;

    constructor(private cartService: CartService) { }

    ngOnInit() {
        // In order to show the popup and to get the data of the selected product we're going to subscribe to the service in popupState
        this.cartService.popupState$.subscribe(state => {
            this.isVisible = state.isOpen;
            this.cartItem = state.data;
            // this.cartProduct.push(this.cartItems)
            console.log(this.cartItem);
        });

        // Subscription for the number of selected products
        this.cartService.cartLength$.subscribe(count => {
            this.itemCount = count;
        });

        this.startTimer();
    }

    // Method to close the popup
    closeComponent() {
        this.cartService.closePopup();
    }

    startTimer() {
        this.stopTimer();

        this.timerSub = timer(7000).subscribe(() => {
            console.log("popup closed")
            this.closeComponent()
        });

    }

    stopTimer() {
        if (this.timerSub) {
            this.timerSub.unsubscribe();
            this.timerSub = null;
        }
        console.log("timer resettato")
    }

    ngOnDestroy() {
        this.timerSub?.unsubscribe();
    }
}
