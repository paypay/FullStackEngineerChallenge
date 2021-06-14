import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../common/modules/shared/shared.module';
import { ViewEmployeeDetailsComponent } from './view-employee-details/view-employee-details.component';
import { AddNewEmployeeComponent } from './add-new-employee/add-new-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const adminRoutes: Routes = [
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: '',
    component: LandingComponent, pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    LandingComponent,
    ViewEmployeeDetailsComponent,
    AddNewEmployeeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(adminRoutes),
  ]
})
export class AdminModule { }
