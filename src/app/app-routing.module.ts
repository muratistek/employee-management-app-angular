import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { AuthService } from './auth.service';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';

const auth = new AuthService()

const routes: Routes = [
  { path: '', redirectTo: auth.currentUserID ? '/employeeList' : '/signUp', pathMatch: 'full' },
  { path: 'signUp', component: SignupComponent, canActivate: [AuthGuard] },
  { path: 'employeeList', component: EmployeeListComponent, canActivate: [AuthGuard] },
  { path: 'addEmployee', component: AddEmployeeComponent, canActivate: [AuthGuard] },
  { path: 'addEmployee/:employeeID', component: AddEmployeeComponent, canActivate: [AuthGuard] },
  { path: 'viewEmployee/:employeeID', component: ViewEmployeeComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: auth.currentUserID ? '/employeeList' : '/signUp', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
