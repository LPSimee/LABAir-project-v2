import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';

@Component({
    selector: 'app-order-confirmation',
    standalone: false,
    templateUrl: './order-confirmation.component.html',
    styleUrl: './order-confirmation.component.scss'
})
export class OrderConfirmationComponent {
    constructor(private cartService: CartService, private orderService: OrderService) { }

    ngOnInit() {
        this.cartService.setCheckoutState(true);
    }
}
