import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './component/student/student.component';
import { ViewStudentComponent } from './component/student/view-student/view-student.component';

const routes: Routes = [
  {path: '', component: StudentComponent},
  {path: 'students', component: StudentComponent},
  {path: 'students/:id', component: ViewStudentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
