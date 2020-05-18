import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateQuestionComponent } from './pages/teacher/create-question/create-question.component';
import { QuestionsComponent } from './pages/teacher/questions/questions.component';
import { ClassesComponent } from './pages/teacher/classes/classes.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/tao-de' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tao-de', component: CreateQuestionComponent },
  { path: 'danh-sach-de', component: QuestionsComponent },
  { path: 'danh-sach-lop', component: ClassesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
