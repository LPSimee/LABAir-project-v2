import { Component } from '@angular/core';

@Component({
    selector: 'app-cart',
    standalone: false,
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss'
})
export class CartComponent {

    totalPrice: number = 0;
    isPopupOpen: boolean = false;

    addSelectedItem() {

    }

    removeSelectedItem() {

    }

    showPopup() {
        this.isPopupOpen = !this.isPopupOpen;
    }
}
