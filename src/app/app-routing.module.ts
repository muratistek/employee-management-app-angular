import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/employeeList', pathMatch: 'full' },
  { path: 'employeeList', component: EmployeeListComponent },
  { path: 'addEmployee', component: EmployeeListComponent },
  { path: 'addEmployee/:employeeID', component: EmployeeListComponent },
  { path: 'viewEmployee/:employeeID', component: EmployeeListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
