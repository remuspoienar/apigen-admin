// angular basic dependencies
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

// material design dependencies
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCheckboxModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
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
import { AttributeInputComponent } from './components/attribute-input/attribute-input.component';
import { AssociationInputComponent } from './components/association-input/association-input.component';
import { ResourceCrudComponent } from './components/resource-crud/resource-crud.component';
import { ResourceErrorComponent } from './components/resource-crud/resource-error.component';
import { ResourceIndexComponent } from './components/resource-crud/resource-index.component';
import { ResourceNewComponent } from './components/resource-crud/resource-new.component';
import { ResourceShowComponent } from './components/resource-crud/resource-show.component';
import { UserPermissionComponent } from './components/user-permission/user-permission.component';

// services
import { ApiDataService } from './services/api-data.service';
import { AuthenticationService } from './services/authentication.service';

// custom pipes
import {CapitalizePipe} from "./pipes/capitalize.pipe";

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
  imports: [BrowserModule, MaterialModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, RouterModule.forRoot(routes), HttpModule, NgxDatatableModule],
  declarations: [
    // components
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
    ApiAssociationComponent,
    AttributeInputComponent,
    AssociationInputComponent,
    ResourceCrudComponent,
    ResourceErrorComponent,
    ResourceIndexComponent,
    ResourceNewComponent,
    ResourceShowComponent,
    UserPermissionComponent,

    //pipes
    CapitalizePipe
  ],
  providers: [AuthenticationService, ApiDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
