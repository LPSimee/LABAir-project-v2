import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CheckoutData } from '../interfaces/checkoutData';

@Component({
    selector: 'app-signup',
    standalone: false,
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss'
})
export class SignupComponent {
    constructor(private cartService: CartService) { }

    ngOnInit() {
        this.cartService.setCheckoutState(true);
    }

    shippingData: CheckoutData = {
        email: "",
        name: "",
        surname: "",
        address: "",
        cap: "",
        city: "",
        country: "",
        phone: ""
    };

    pwdInputFlag: boolean = true;

    showPassword() {
        console.log("ao mostrate")
        this.pwdInputFlag = !this.pwdInputFlag;
    }

}
