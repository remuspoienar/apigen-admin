import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

import { ApiUser } from './../models/api-user.model';

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
    <span *ngIf="!isSignedOut()">
      <b *ngIf="currentUser">{{ currentUser.name }}</b>
      <button (click)="signOut()" md-button>SIGN OUT</button>
    </span>
  </md-toolbar>
  <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {

  constructor(
    private _router: Router,
    private _auth: AuthenticationService) { }

  ngOnInit() {
    if (ApiUser.current === null) {
      this._router.navigate(['signin']);
    }
  }

  signOut() {
    this._auth.logout();
    this._router.navigate(['signin']);
  }

  get currentUser(): ApiUser {
    return ApiUser.current;
  }

  gotoDashBoard() {
    this._router.navigate(['dashboard']);
  }

  isSignedOut(): boolean {
    return localStorage.getItem('authToken') === null;
  }

}
