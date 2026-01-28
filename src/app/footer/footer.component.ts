import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
    selector: 'app-footer',
    standalone: false,
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {
    constructor(private cartService: CartService) { }

    // Per adesso non usiamo la pulizia del ngOnDestroy
    isCheckoutActive: boolean = null;

    ngOnInit() {
        this.cartService.checkoutState$.subscribe(state => {
            this.isCheckoutActive = state;
            console.log("isCheckoutActive da footer:", this.isCheckoutActive)
        });

    }
}
