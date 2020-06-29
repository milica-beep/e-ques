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
import { ApproveProfessorComponent } from './components/approve-professor/approve-professor.component';
import { AddSubjectComponent } from './components/add-subject/add-subject.component';
import { DeleteSubjectComponent } from './components/delete-subject/delete-subject.component';
import { UpdateSubjectComponent } from './components/update-subject/update-subject.component';
import { EditUserDataComponent } from './components/edit-user-data/edit-user-data.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

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
     { path: 'professor-subject', component: ProfessorSubjectComponent },
     { path: 'professor-approve', component: ApproveProfessorComponent },
     { path: 'add-subject', component: AddSubjectComponent },
     { path: 'delete-subject', component: DeleteSubjectComponent },
     { path: 'update-subject', component: UpdateSubjectComponent }
   ] },
   {
     path: 'edit-user-data/:userId', component: EditUserDataComponent
   },
   {
    path: 'search-results', component: SearchResultComponent
   },
   {
     path: 'verify-email/:token', component: VerifyEmailComponent
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
