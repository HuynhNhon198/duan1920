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
import {DragDropModule} from '@angular/cdk/drag-drop';


import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/login/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { CreateQuestionComponent } from './pages/teacher/create-question/create-question.component';
import { QuestionsComponent } from './pages/teacher/questions/questions.component';
import { Type0Component } from './pages/teacher/create-question/type0/type0.component';
import { Type1Component } from './pages/teacher/create-question/type1/type1.component';
import { SafePipe } from './pipes/safe-url.pipe';
import { DetailQuesionViewComponent } from './pages/teacher/questions/detail-quesion-view/detail-quesion-view.component';
import { ClassesComponent } from './pages/teacher/classes/classes.component';
import { QuestionViewComponent } from './components/question-view/question-view.component';
import { CustomStringPipe } from './pipes/custom-string.pipe';

registerLocaleData(vi);

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    CreateQuestionComponent,
    QuestionsComponent,
    Type0Component,
    Type1Component,
    SafePipe,
    DetailQuesionViewComponent,
    ClassesComponent,
    QuestionViewComponent,
    CustomStringPipe
  ],
  imports: [
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
