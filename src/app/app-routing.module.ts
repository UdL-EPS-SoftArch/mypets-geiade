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
import { ShelterListComponent } from './shelter/shelter-list/shelter-list.component'
import {ShelterCreateComponent} from "./shelter/shelter-create/shelter-create.component";
import { CatListComponent } from './pet/cat/cat-list/cat-list.component';
import { DogListComponent } from './pet/dog/dog-list/dog-list.component';
import { CatCreateComponent } from './pet/cat/cat-create/cat-create.component';
import { CatDetailComponent } from './pet/cat/cat-detail/cat-detail.component';
import { CatEditComponent } from './pet/cat/cat-edit/cat-edit.component';
import { CatDeleteComponent } from './pet/cat/cat-delete/cat-delete.component';

const routes: Routes = [
  { path: 'users/create', component: UserRegisterComponent},
  { path: 'users/:id/delete', component: UserDeleteComponent, canActivate: [LoggedInGuard]},
  { path: 'users/:id/edit', component: UserEditComponent, canActivate: [LoggedInGuard]},
  { path: 'users/:id', component: UserDetailComponent, canActivate: [LoggedInGuard]},
  { path: 'users', component: UserListComponent, canActivate: [LoggedInGuard]},
  { path: 'about', component: AboutComponent},
  { path: '404', component: NotFoundComponent},
  { path: '', redirectTo: 'about', pathMatch: 'full'},
  { path: 'shelters', component: ShelterListComponent},
  { path: 'shelters/create', component: ShelterCreateComponent},
  { path: 'cats', component: CatListComponent, canActivate: [LoggedInGuard]},
  { path: 'cats/create', component: CatCreateComponent, canActivate: [LoggedInGuard]},
  { path: 'cats/:id', component: CatDetailComponent, canActivate: [LoggedInGuard]},
  { path: 'cats/:id/edit', component: CatEditComponent, canActivate: [LoggedInGuard]},
  { path: 'cats/:id/delete', component: CatDeleteComponent, canActivate: [LoggedInGuard]},
  { path: 'dogs', component: DogListComponent, canActivate: [LoggedInGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
