import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './layouts/home/home.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';


const routes: Routes = [{
  path: 'home',
  component: HomeComponent
 }, {
  path: 'user/:id',
  component: UserProfileComponent
 }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
