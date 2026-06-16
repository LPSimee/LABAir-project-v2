import { Component } from '@angular/core';
import { UserData } from '../interfaces/userData';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-signup',
    standalone: false,
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss'
})
export class SignupComponent {
    constructor(private userService: UserService, private router: Router) { }

    ngOnInit() {
        this.userService.setHeaderFooterState(true);
    }

    user: UserData = {
        nome: "",
        cognome: "",
        email: "",
        password: "",
        giorno: "",
        mese: "",
        anno: "",
    };

    pwdInputFlag: boolean = true;
    dateInputFlag: boolean = true;
    privacyTermsFlag: boolean = false;
    allCorrectInputsFlag: boolean = true;

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
        let giorno = parseInt(this.user.giorno, 10);
        let mese = parseInt(this.user.mese, 10);
        let anno = parseInt(this.user.anno, 10);

        if (this.user.giorno
            .length > 0) {
            if (giorno === 0) {
                this.user.giorno = '1';
                giorno = 1;
            } else if (giorno > 31) {
                this.user.giorno = '31';
                giorno = 31;
            }
        }

        if (this.user.mese.length > 0) {
            if (mese === 0) {
                this.user.mese = '1';
                mese = 1;
            } else if (mese > 12) {
                this.user.mese
                    = '12';
                mese = 12;
            }
        }

        if (mese > 12) {
            this.user.mese = '12'
            this.dateInputFlag = false;
            return;
        }
        if (this.user.anno?.length === 4) {
            if (anno < 1900) {
                this.user.anno = '1900';
                anno = 1900;
            } else if (anno > 2026) {
                this.user.anno = '2026';
                anno = 2026;
            }


        }

        if (!giorno || !mese || !anno || this.user.anno?.length < 4) {
            // this.dateInputFlag = true;
            return;
        }

        // Last check if the Date inserted is correct
        const dateCheck = new Date(anno, mese - 1, giorno);
        const togiornoDate = new Date();

        if ((dateCheck.getFullYear() === anno) &&
            (dateCheck.getMonth() === mese - 1) &&
            (dateCheck.getDate() === giorno) && (dateCheck.getTime() <= togiornoDate.getTime())) {
            this.dateInputFlag = true;
        } else {
            this.dateInputFlag = false;
        }
    }

    setPrivacyTermsInput() {
        this.privacyTermsFlag = !this.privacyTermsFlag;
    }

    saveNewUser(form: NgForm) {
        if (form.invalid && this.privacyTermsFlag == false) {
            console.log("Errore");
            this.allCorrectInputsFlag = !this.allCorrectInputsFlag;
            this.privacyTermsFlag = false;
            form.control.markAllAsTouched();
            return;

        }

        console.log(this.user);
        console.log("Puoi andare");

        this.userService.addNewUser(this.user).subscribe({
            next: (data) => console.log("Ok", data),
            error: (error) => console.log(error)
        });
        this.router.navigate(['/home']);
    }

    ngOnDestroy() {
        this.userService.setHeaderFooterState(false);
        // this.userService
    }
}
