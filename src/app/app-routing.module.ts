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


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/tao-de' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'de/:id', component: TestSubjectComponent },
  { path: 'tao-de', component: CreateTestSubjectComponent },
  { path: 'danh-sach-de', component: TestSubjectsComponent },
  { path: 'danh-sach-lop-hoc', component: ClassesComponent },
  { path: 'danh-sach-cau-hoi', component: QuestionsComponent },
  { path: 'bai-kiem-tra/:id', component: ExamComponent },
  { path: 'danh-sach-bai-kiem-tra', component: ExamsComponent },
  { path: 'lop-hoc/:id', component: ClassComponent },
  { path: 'student/danh-sach-lop-hoc', component: MyClassesComponent },
  { path: 'student/lop-hoc/:id', component: StudentClass },
  { path: 'student/danh-sach-bai-kiem-tra', component: MyExamsComponent },
  { path: 'student/kiem-tra/:id', component: DoExamComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
