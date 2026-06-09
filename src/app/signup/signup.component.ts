import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { UserData } from '../interfaces/userData';

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

    user: UserData = {
        name: "",
        surname: "",
        email: "",
        password: "",
        day: "",
        month: "",
        year: "",
    };

    pwdInputFlag: boolean = true;

    showPassword() {
        this.pwdInputFlag = !this.pwdInputFlag;
    }

}
