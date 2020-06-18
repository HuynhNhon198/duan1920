import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, vi_VN } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';

import { QuillModule } from 'ngx-quill';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NzAffixModule } from 'ng-zorro-antd/affix';

import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/login/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { Type0Component } from './pages/teacher/create-test-subject/type0/type0.component';
import { Type1Component } from './pages/teacher/create-test-subject/type1/type1.component';
import { SafePipe } from './pipes/safe-url.pipe';
import { ClassesComponent } from './pages/teacher/classes/classes.component';
import { QuestionViewComponent } from './components/question-view/question-view.component';
import { CustomStringPipe } from './pipes/custom-string.pipe';
import { NextStepComponent } from './pages/teacher/create-test-subject/type0/next-step/next-step.component';
import { TestSubjectComponent } from './pages/teacher/test-subject/test-subject.component';
import { ExamComponent } from './pages/teacher/exam/exam.component';
import { ClassComponent } from './pages/teacher/class/class.component';
import { ExamsComponent } from './pages/teacher/exams/exams.component';
import { TestSubjectsComponent } from './pages/teacher/test-subjects/test-subjects.component';
import { CreateTestSubjectComponent } from './pages/teacher/create-test-subject/create-test-subject.component';
import { ListStudentsComponent } from './pages/teacher/class/list-students/list-students.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { QuestionsComponent } from './pages/teacher/questions/questions.component';
import { MyClassesComponent } from './pages/student/my-classes/my-classes.component';
import { MyExamsComponent } from './pages/student/my-exams/my-exams.component';

import { ClassComponent as StudentClass } from './pages/student/my-classes//class/class.component';
import { DoExamComponent } from './pages/student/do-exam/do-exam.component';
registerLocaleData(vi);

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    Type0Component,
    Type1Component,
    SafePipe,
    ClassesComponent,
    QuestionViewComponent,
    CustomStringPipe,
    NextStepComponent,
    TestSubjectComponent,
    ExamComponent,
    ClassComponent,
    ExamsComponent,
    TestSubjectsComponent,
    CreateTestSubjectComponent,
    ListStudentsComponent,
    QuestionsComponent,
    SafeHtmlPipe,
    MyClassesComponent,
    MyExamsComponent,
    StudentClass,
    DoExamComponent
  ],
  imports: [
    NzAffixModule,
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    QuillModule.forRoot(),
    DragDropModule
  ],
  providers: [{ provide: NZ_I18N, useValue: vi_VN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
