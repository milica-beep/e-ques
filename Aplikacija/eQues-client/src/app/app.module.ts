import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './components/test/test.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultComponent } from './layouts/default/default.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule  } from '@angular/material/button';
import { MatTabsModule  } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { TokenInterceptor } from './services/token.interceptor';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';

import { HomeComponent } from './layouts/home/home.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SubjectComponent } from './components/subject/subject.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { DiscusionComponent } from './components/discusion/discusion.component';
import { AddQuestionComponent } from './layouts/add-question/add-question.component';
import { AnswerComponent } from './components/answer/answer.component';
import { DiscussionViewComponent } from './layouts/discussion-view/discussion-view.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { ProfessorSubjectComponent } from './components/professor-subject/professor-subject.component';
import { ApproveProfessorComponent } from './components/approve-professor/approve-professor.component';
import { AddSubjectComponent } from './components/add-subject/add-subject.component';
import { DeleteSubjectComponent } from './components/delete-subject/delete-subject.component';
import { UpdateSubjectComponent } from './components/update-subject/update-subject.component';
import { MatNativeDateModule } from '@angular/material/core';
import { PieComponent } from './shared/widgets/pie/pie.component';

import { ChartModule } from 'angular-highcharts';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    RegisterComponent,
    DefaultComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    SidebarComponent,
    UserProfileComponent,
    SubjectComponent,
    FooterComponent,
    DiscusionComponent,
    AddQuestionComponent,
    AnswerComponent,
    DiscussionViewComponent,
    StarRatingComponent,
    AdminComponent,
    ProfessorSubjectComponent,
    ApproveProfessorComponent,
    AddSubjectComponent,
    DeleteSubjectComponent,
    UpdateSubjectComponent,
    PieComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatSelectModule,
    MatRadioModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatGridListModule,
    MatExpansionModule,
    MatTooltipModule,
    MatCardModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ChartModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
