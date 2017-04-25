import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
    providers: [AuthenticationService]

})
export class SignupComponent {

    loading: boolean;
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    errorMsg: string;

    constructor(
        private router: Router,
        private _auth: AuthenticationService) { }

    signUp() {
        this.loading = true;
        this.errorMsg = null;
        let userData = {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.passwordConfirmation
        };
        this._auth.register(userData).subscribe(error => this.errorMsg = error);
        this.loading = false;
        this.router.navigate(['dashboard']);
    }

    goToSignIn() {
        this.router.navigate(['signin']);
    }


}
