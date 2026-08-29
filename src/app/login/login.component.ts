import { Component } from '@angular/core';
import { LoginData } from '../interfaces/userData';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-login',
    standalone: false,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    constructor(private userService: UserService, private router: Router) { }

    ngOnInit() {
        this.userService.setHeaderFooterState(true);
    }

    userCredentials: LoginData = {
        email: "",
        password: ""
    };

    pwdInputFlag: boolean = true;
    errCredentialsFlag: boolean = false;

    showPassword() {
        this.pwdInputFlag = !this.pwdInputFlag;
    }

    loginUser(form: NgForm) {
        if (form.invalid) {
            console.log("Errore");
            form.control.markAllAsTouched();
            this.errCredentialsFlag = true;
            return;
        }

        console.log(this.userCredentials);
        console.log("Puoi andare");

        this.userService.loginUser(this.userCredentials).subscribe({
            next: (data) => console.log("Ok", data),
            error: (error) => {
                console.log(error);
                this.errCredentialsFlag = true;
            }
        });
        this.router.navigate(['/home']);
    }

    ngOnDestroy() {
        this.userService.setHeaderFooterState(false);
    }
}
