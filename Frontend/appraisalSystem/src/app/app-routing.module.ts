import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticateComponent } from './authenticate/authenticate.component';

const routes: Routes = [
  { path: 'authenticate', component: AuthenticateComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'employee', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
