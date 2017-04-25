import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'my-app',
  template: `
  <md-toolbar color="primary">
    <button md-button (click)="gotoDashBoard()">DASHBOARD</button>

    <!-- This fills the remaining space of the current row -->
    <span class="example-fill-remaining-space"></span>

    <span *ngIf="isSignedOut()">
      <button md-button routerLink="/signin">SIGN IN</button>
      <span>OR</span>
      <button md-button routerLink="/signup">SIGN UP</button>
    </span>
    <button *ngIf="!isSignedOut()" (click)="signOut()" md-button>SIGN OUT</button>
  </md-toolbar>
  <router-outlet></router-outlet>
  `,
  providers: [AuthenticationService]
})
export class AppComponent {

  constructor(
    private router: Router,
    private _auth: AuthenticationService) { }

  signOut() {
    this._auth.logout();
  }

  gotoDashBoard() {
    this.router.navigate(['dashboard']);
  }

  isSignedOut() {
    return localStorage.getItem('authToken') === null;
  }

}
