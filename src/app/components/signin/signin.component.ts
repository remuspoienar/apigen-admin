import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiUser } from '../../models/api-user.model';
import { AuthenticationService } from '../../services/authentication.service';
import { authHandler } from '../../helpers/authentication.helper';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [AuthenticationService]

})
export class SigninComponent {

  loading: boolean;
  email: string;
  password: string;
  errorMsg: string;

  constructor(
    private _router: Router,
    private _auth: AuthenticationService) { }

  signIn() {
    this.loading = true;
    this.errorMsg = null;

    this._auth.login(this.email, this.password).subscribe(authHandler['data'].bind(this), authHandler['error'].bind(this));
  }

  goToSignUp() {
    this.loading = true;
    this._router.navigate(['/signup']);
  }


}
