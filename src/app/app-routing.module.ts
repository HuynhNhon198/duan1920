import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { QuestionsComponent } from './pages/teacher/questions/questions.component';
import { ClassesComponent } from './pages/teacher/classes/classes.component';
import { TestSubjectComponent } from './pages/teacher/test-subject/test-subject.component';
import { ExamComponent } from './pages/teacher/exam/exam.component';
import { ExamsComponent } from './pages/teacher/exams/exams.component';
import { ClassComponent } from './pages/teacher/class/class.component';
import { TestSubjectsComponent } from './pages/teacher/test-subjects/test-subjects.component';
import { CreateTestSubjectComponent } from './pages/teacher/create-test-subject/create-test-subject.component';
import { MyClassesComponent } from './pages/student/my-classes/my-classes.component';
import { ClassComponent as StudentClass } from './pages/student/my-classes//class/class.component';
import { MyExamsComponent } from './pages/student/my-exams/my-exams.component';
import { DoExamComponent } from './pages/student/do-exam/do-exam.component';
import {
  hasCustomClaim,
  redirectUnauthorizedTo,
  AngularFireAuthGuard
} from '@angular/fire/auth-guard';
import { Page404Component } from './pages/page404/page404.component';
import { MeComponent } from './pages/me/me.component';

const teacher = () => hasCustomClaim('teacher');
const student = () => hasCustomClaim('student');
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: '', component: WelcomeComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'me', component: MeComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'de/:id', component: TestSubjectComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'tao-de', component: CreateTestSubjectComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: teacher }
  },
  {
    path: 'danh-sach-de', component: TestSubjectsComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'danh-sach-lop-hoc', component: ClassesComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: teacher }
  },
  {
    path: 'danh-sach-cau-hoi', component: QuestionsComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: teacher }
  },
  {
    path: 'bai-kiem-tra/:id', component: ExamComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: teacher }
  },
  {
    path: 'danh-sach-bai-kiem-tra', component: ExamsComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: teacher }
  },
  {
    path: 'lop-hoc/:id', component: ClassComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: teacher }
  },
  {
    path: 'student/danh-sach-lop-hoc', component: MyClassesComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: student }
  },
  {
    path: 'student/lop-hoc/:id', component: StudentClass,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: student }
  },
  {
    path: 'student/danh-sach-bai-kiem-tra', component: MyExamsComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: student }
  },
  {
    path: 'student/kiem-tra/:id', component: DoExamComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: student }
  },
  {
    path: '404',
    component: Page404Component,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
