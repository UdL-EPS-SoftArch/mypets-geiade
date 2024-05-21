import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from './login-basic/loggedin.guard';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './error-handler/error-alert/not-found.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserDeleteComponent } from './user/user-delete/user-delete.component';
import {AdoptionSearchComponent} from './adoptions/adoption-search/adoption-search.component';
import {AdoptionListComponent} from './adoptions/adoption-list/adoption-list.component';
import {AdoptionEditComponent} from './adoptions/adoption-edit/adoption-edit.component';
import {AdoptionDetailComponent} from './adoptions/adoption-detail/adoption-detail.component';
import {AdoptionDeleteComponent} from './adoptions/adoption-delete/adoption-delete.component';
import {AdoptionCreateComponent} from "./adoptions/adoption-create/adoption-create.component";
import {ShelterListComponent} from './shelter/shelter-list/shelter-list.component'
import {ShelterCertificateListComponent} from "./shelter-certificate/shelter-certificate-list/shelter-certificate-list.component";
import {ShelterCertificateCreateComponent} from "./shelter-certificate/shelter-certificate-create/shelter-certificate-create.component";
import {ShelterCertificateDetailComponent} from "./shelter-certificate/shelter-certificate-detail/shelter-certificate-detail.component";
import {ShelterCertificateDeleteComponent} from "./shelter-certificate/shelter-certificate-delete/shelter-certificate-delete.component";
import {ShelterCreateComponent} from "./shelter/shelter-create/shelter-create.component";
import {LocationListComponent} from "./location/location-list/location-list.component";
import {LocationCreateComponent} from "./location/location-create/location-create.component";
import {ScheduleListComponent} from "./schedule/schedule-list/schedule-list.component";
import {ScheduleCreateComponent} from "./schedule/schedule-create/schedule-create.component";
import {ScheduleDetailComponent} from "./schedule/schedule-detail/schedule-detail.component";


const routes: Routes = [
  { path: 'users/create', component: UserRegisterComponent},
  { path: 'users/:id/delete', component: UserDeleteComponent, canActivate: [LoggedInGuard]},
  { path: 'users/:id/edit', component: UserEditComponent, canActivate: [LoggedInGuard]},
  { path: 'users/:id', component: UserDetailComponent, canActivate: [LoggedInGuard]},
  { path: 'users', component: UserListComponent, canActivate: [LoggedInGuard]},
  { path: 'locations', component: LocationListComponent, canActivate: [LoggedInGuard]},
  { path: 'locations/create', component: LocationCreateComponent, canActivate: [LoggedInGuard]},
  { path: 'adoptions' , component: AdoptionListComponent },
  { path: 'adoptions/create', component: AdoptionCreateComponent },
  { path: 'adoptions/edit', component: AdoptionEditComponent },
  { path: 'adoptions/delete', component: AdoptionDeleteComponent },
  { path: 'adoptions/detail', component: AdoptionDetailComponent },
  { path: 'adoptions/search', component: AdoptionSearchComponent },
  { path: 'shelters', component: ShelterListComponent},
  { path: 'shelters/create', component: ShelterCreateComponent},
  { path: 'shelter-certificate', component: ShelterCertificateListComponent},
  { path: 'shelter-certificate/create', component: ShelterCertificateCreateComponent},
  { path: 'shelter-certificate/:id', component: ShelterCertificateDetailComponent},
  { path: 'shelter-certificate/:id/delete', component: ShelterCertificateDeleteComponent},
  { path: 'schedules', component: ScheduleListComponent, canActivate: [LoggedInGuard]},
  { path: 'schedules/create', component: ScheduleCreateComponent, canActivate: [LoggedInGuard]},
  { path: 'schedules/:id', component: ScheduleDetailComponent, canActivate: [LoggedInGuard]},
  { path: 'about', component: AboutComponent},
  { path: '404', component: NotFoundComponent},
  { path: '', redirectTo: 'about', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
