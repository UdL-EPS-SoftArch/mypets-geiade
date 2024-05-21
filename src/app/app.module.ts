import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgxHateoasClientConfigurationService, NgxHateoasClientModule} from '@lagoshny/ngx-hateoas-client';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {AboutComponent} from './about/about.component';
import {NotFoundComponent} from './error-handler/error-alert/not-found.component';
import {UserRegisterComponent} from './user/user-register/user-register.component';
import {UserDetailComponent} from './user/user-detail/user-detail.component';
import {UserListComponent} from './user/user-list/user-list.component';
import {UserEditComponent} from './user/user-edit/user-edit.component';
import {UserDeleteComponent} from './user/user-delete/user-delete.component';
import {UserSearchComponent} from './user/user-search/user-search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgbCollapseModule, NgbDropdownModule, NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {LoginBasicModule} from './login-basic/login-basic.module';
import {ErrorHandlerModule} from './error-handler/error-handler.module';
import {AuthInterceptor} from './login-basic/auth-interceptor';
import {HttpErrorInterceptor} from './error-handler/http-error-interceptor';
import {AuthenticationBasicService} from './login-basic/authentication-basic.service';
import {LoggedInGuard} from './login-basic/loggedin.guard';
import {UserService} from './user/user.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {AdoptionSearchComponent} from './adoptions/adoption-search/adoption-search.component';
import {AdoptionListComponent} from './adoptions/adoption-list/adoption-list.component';
import {AdoptionEditComponent} from './adoptions/adoption-edit/adoption-edit.component';
import {AdoptionDetailComponent} from './adoptions/adoption-detail/adoption-detail.component';
import {AdoptionDeleteComponent} from './adoptions/adoption-delete/adoption-delete.component';
import {AdoptionCreateComponent} from "./adoptions/adoption-create/adoption-create.component";
import {ShelterCertificateListComponent} from "./shelter-certificate/shelter-certificate-list/shelter-certificate-list.component";
import {ShelterCertificateCreateComponent} from "./shelter-certificate/shelter-certificate-create/shelter-certificate-create.component";
import {ShelterCertificateDetailComponent} from "./shelter-certificate/shelter-certificate-detail/shelter-certificate-detail.component";
import {ShelterCertificateDeleteComponent} from "./shelter-certificate/shelter-certificate-delete/shelter-certificate-delete.component";
import {RoleListComponent} from './role/role-list/role-list.component';
import {RoleCreateComponent} from './role/role-create/role-create.component';
import {RoleDeleteComponent} from "./role/role-delete/role-delete.component";
import {RoleDetailComponent} from "./role/role-detail/role-detail.component";
import {ShelterService} from "./shelter/shelter.service";
import {ShelterListComponent} from "./shelter/shelter-list/shelter-list.component";
import {ShelterCreateComponent} from "./shelter/shelter-create/shelter-create.component";
import {ShelterDetailComponent} from "./shelter/shelter-detail/shelter-detail.component";
import {LocationService} from './location/location.service'
import {LocationListComponent} from './location/location-list/location-list.component';
import {LocationSearchComponent} from './location/location-search/location-search.component';
import {LocationCreateComponent} from "./location/location-create/location-create.component";
import {ScheduleService} from './schedule/schedule.service'
import {ScheduleListComponent} from './schedule/schedule-list/schedule-list.component';
import {ScheduleSearchComponent} from './schedule/schedule-search/schedule-search.component';
import {ScheduleCreateComponent} from "./schedule/schedule-create/schedule-create.component";
import {ScheduleDetailComponent} from "./schedule/schedule-detail/schedule-detail.component";
import { CatListComponent } from './pet/cat/cat-list/cat-list.component';
import { CatService } from './pet/cat/cat.service';
import { DogService } from './pet/dog/dog.service';
import { CatCreateComponent } from './pet/cat/cat-create/cat-create.component';
import { CatDetailComponent } from './pet/cat/cat-detail/cat-detail.component';
import { CatEditComponent } from './pet/cat/cat-edit/cat-edit.component';
import { CatDeleteComponent } from './pet/cat/cat-delete/cat-delete.component';
import { CatSearchComponent } from './pet/cat/cat-search/cat-search.component';
import { DogListComponent } from './pet/dog/dog-list/dog-list.component';
import { DogCreateComponent } from './pet/dog/dog-create/dog-create.component';
import { DogDetailComponent } from './pet/dog/dog-detail/dog-detail.component';
import { DogDeleteComponent } from './pet/dog/dog-delete/dog-delete.component';
import { DogEditComponent } from './pet/dog/dog-edit/dog-edit.component';
import { DogSearchComponent } from './pet/dog/dog-search/dog-search.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    NotFoundComponent,
    UserListComponent,
    UserDetailComponent,
    UserRegisterComponent,
    UserEditComponent,
    UserDeleteComponent,
    UserSearchComponent,
    AdoptionSearchComponent,
    AdoptionCreateComponent,
    AdoptionDeleteComponent,
    AdoptionDetailComponent,
    AdoptionEditComponent,
    AdoptionListComponent,
    ShelterCertificateListComponent,
    ShelterCertificateCreateComponent,
    ShelterCertificateDetailComponent,
    ShelterCertificateDeleteComponent,
    ScheduleListComponent,
    ScheduleSearchComponent,
    ScheduleCreateComponent,
    ScheduleDetailComponent,
    RoleListComponent,
    RoleCreateComponent,
    RoleDeleteComponent,
    RoleDetailComponent,
    ShelterListComponent,
    ShelterCreateComponent,
    ShelterDetailComponent,
    LocationListComponent,
    LocationSearchComponent,
    LocationCreateComponent,
    CatListComponent,
    CatCreateComponent,
    CatDetailComponent,
    CatDeleteComponent,
    CatEditComponent,
    CatSearchComponent,
    DogListComponent,
    DogCreateComponent,
    DogDetailComponent,
    DogDeleteComponent,
    DogEditComponent,
    DogSearchComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbCollapseModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgxHateoasClientModule.forRoot(),
    LoginBasicModule,
    ErrorHandlerModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    AuthenticationBasicService, LoggedInGuard, UserService, ScheduleService, ShelterService, LocationService,
    CatService, DogService, provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(hateoasConfig: NgxHateoasClientConfigurationService) {
    hateoasConfig.configure({
      http: {
        rootUrl: environment.API
      }
    });
  }
}
