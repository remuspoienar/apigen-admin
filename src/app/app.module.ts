// angular basic dependencies
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// material design dependencies
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCheckboxModule } from '@angular/material';
import 'hammerjs';

// components
import { AppComponent } from './components/app.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

//services
import { ApiDataService } from './services/api-data.service';
import { AuthenticationService } from './services/authentication.service';

// routes config
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
  providers: [AuthenticationService, ApiDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
