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
import { ApiProjectDetailComponent } from './components/api-project-detail/api-project-detail.component';
import { NewApiProjectComponent } from './components/new-api-project/new-api-project.component';
import { ApiProjectLauncherComponent } from './components/api-project-launcher/api-project-launcher.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ApiResourceComponent } from './components/api-resource/api-resource.component';
import { ApiAttributeComponent } from './components/api-attribute/api-attribute.component';
import { ApiValidationComponent } from './components/api-validation/api-validation.component';
import { ApiAssociationComponent } from './components/api-association/api-association.component';

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
  },
  {
    path: 'api-projects/new',
    component: NewApiProjectComponent
  },
  {
    path: 'api-projects/:id',
    component: ApiProjectDetailComponent
  },
  {
    path: 'api-project-launchers/:id',
    component: ApiProjectLauncherComponent
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];


@NgModule({
  imports: [BrowserModule, MaterialModule, FormsModule, BrowserAnimationsModule, RouterModule.forRoot(routes)],
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    DashboardComponent,
    ApiProjectDetailComponent,
    NewApiProjectComponent,
    ApiProjectLauncherComponent,
    PageNotFoundComponent,
    ApiResourceComponent,
    ApiAttributeComponent,
    ApiValidationComponent,
    ApiAssociationComponent
  ],
  providers: [AuthenticationService, ApiDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
