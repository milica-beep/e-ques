import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './layouts/home/home.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SubjectComponent } from './components/subject/subject.component';
import { AddQuestionComponent } from './layouts/add-question/add-question.component';


const routes: Routes = [{
  path: '',
  component: DefaultComponent
 }, {
  path: 'home',
  component: HomeComponent
 }, {
  path: 'user/:id',
  component: UserProfileComponent
 }, {
   path: 'subject/:id',
   component: SubjectComponent
 }, {
   path: 'add-question',
   component: AddQuestionComponent
 },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
