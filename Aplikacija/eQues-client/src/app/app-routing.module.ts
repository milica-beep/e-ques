import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './layouts/home/home.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SubjectComponent } from './components/subject/subject.component';
import { AddQuestionComponent } from './layouts/add-question/add-question.component';
import { DiscusionComponent } from './components/discusion/discusion.component';
import { AnswerComponent } from './components/answer/answer.component';
import { DiscussionViewComponent } from './layouts/discussion-view/discussion-view.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { ProfessorSubjectComponent } from './components/professor-subject/professor-subject.component';

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  pathMatch: 'full'
 }, {
  path: 'home',
  component: HomeComponent
 }, {
  path: 'user/:id',
  component: UserProfileComponent
 }, {
   path: 'subject/:id',
   component: SubjectComponent,
 },{
   path: 'add-question/:id',
   component: AddQuestionComponent
 }, {
   path: 'discussion/:questionId',
   component: DiscussionViewComponent,
   children: [
     {
       path: '',
       component: DiscusionComponent
     },
     {
       path: 'answer',
       component: AnswerComponent
     }
   ]
 },
 {
   path: 'add-comment/:answerId',
   component: AnswerComponent
 },
 { path: 'admin', component: AdminComponent,
   children: [
     { path: 'professor-subject', component: ProfessorSubjectComponent }
   ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
