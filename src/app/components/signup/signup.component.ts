import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { authHandler } from '../../helpers/authentication.helper';

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
        private _router: Router,
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

        this._auth.register(userData).subscribe(authHandler['data'].bind(this), authHandler['error'].bind(this));;
    }

    goToSignIn() {
        this.loading = true;
        this._router.navigate(['signin']);
    }


}
