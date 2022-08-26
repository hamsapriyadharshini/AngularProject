import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SigninComponent } from './signin/signin.component';
import { ChangeConfirmPasswordComponent } from './change-confirm-password/change-confirm-password.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'changePassword', component: ChangePasswordComponent },
  { path: 'home', component: HomeComponent},
  { path: 'resetPassword', component: ChangeConfirmPasswordComponent },ssss
  { path: '', redirectTo: 'guest', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
