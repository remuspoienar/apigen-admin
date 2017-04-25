import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCheckboxModule } from '@angular/material';
import 'hammerjs';

import { AppComponent } from './components/app.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];


@NgModule({
  imports: [BrowserModule, MaterialModule, FormsModule, BrowserAnimationsModule, RouterModule.forRoot(routes)],
  declarations: [AppComponent, SigninComponent, SignupComponent, DashboardComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
