import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';

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
    private router: Router,
    private _auth: AuthenticationService) { }

  signIn() {
    this.loading = true;
    this.errorMsg = null;
    this._auth.login(this.email, this.password).subscribe(token => null, error => this.errorMsg = error);
    this.loading = false;
    
    this.router.navigate(['dashboard']);
  }

  goToSignUp() {
    this.router.navigate(['/signup']);
  }


}
