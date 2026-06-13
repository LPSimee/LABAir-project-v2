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
    dateInputFlag: boolean = true;

    showPassword() {
        this.pwdInputFlag = !this.pwdInputFlag;
    }

    // Method to block the user to insert any alphabetic characters
    checkInputDateLetters(e: KeyboardEvent) {
        if (e.key == "Backspace" || e.key == "Delete" || e.key == "Tab" || e.key == "Escape" || e.key == "Enter" || e.key == "ArrowLeft" || e.key == "ArrowRight") {
            return;
        }
        if (e.key < '0' || e.key > '9') {
            e.preventDefault();
        }
    }

    checkInputDateValue() {
        let day = parseInt(this.user.day, 10);
        let month = parseInt(this.user.month, 10);
        let year = parseInt(this.user.year, 10);

        if (this.user.day
            .length > 0) {
            if (day === 0) {
                this.user.day = '1';
                day = 1;
            } else if (day > 31) {
                this.user.day = '31';
                day = 31;
            }
        }

        if (this.user.month.length > 0) {
            if (month === 0) {
                this.user.month = '1';
                month = 1;
            } else if (month > 12) {
                this.user.month
                    = '12';
                month = 12;
            }
        }

        if (month > 12) {
            this.user.month = '12'
            this.dateInputFlag = false;
            return;
        }
        if (this.user.year?.length === 4) {
            if (year < 1900) {
                this.user.year = '1900';
                year = 1900;
            } else if (year > 2026) {
                this.user.year = '2026';
                year = 2026;
            }


        }

        if (!day || !month || !year || this.user.year?.length < 4) {
            // this.dateInputFlag = true;
            return;
        }

        // Last check if the Date inserted is correct
        const dateCheck = new Date(year, month - 1, day);
        const todayDate = new Date();

        if ((dateCheck.getFullYear() === year) &&
            (dateCheck.getMonth() === month - 1) &&
            (dateCheck.getDate() === day) && (dateCheck.getTime() <= todayDate.getTime())) {
            this.dateInputFlag = true;
        } else {
            this.dateInputFlag = false;
        }
    }
}
