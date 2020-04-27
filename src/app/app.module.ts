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
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/login/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { CreateQuestionComponent } from './pages/teacher/create-question/create-question.component';
import { QuestionsComponent } from './pages/teacher/questions/questions.component';
import { Type0Component } from './pages/teacher/create-question/type0/type0.component';
import { Type1Component } from './pages/teacher/create-question/type1/type1.component';
import { SafePipe } from './pipes/safe-url.pipe';

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
    SafePipe
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
    QuillModule.forRoot()
  ],
  providers: [{ provide: NZ_I18N, useValue: vi_VN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
