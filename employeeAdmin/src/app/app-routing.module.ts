import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListEmployeeComponent } from './components/list-employee/list-employee.component';
import { ListReviewsComponent } from './components/list-reviews/list-reviews.component';
import { TakeReviewComponent } from './components/take-review/take-review.component';

import { AuthGuard } from './authguard';
import { AuthGuardLog } from './authguardLogin';

const routes: Routes = [
    { path: '', component: LoginComponent, canActivate: [AuthGuardLog]},
    { path: 'login', component: LoginComponent, canActivate: [AuthGuardLog]},
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'list-employee', component: ListEmployeeComponent, canActivate: [AuthGuard] },
    { path: 'list-reviews', component: ListReviewsComponent, canActivate: [AuthGuard] },
    { path: 'take-review', component: TakeReviewComponent, canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
