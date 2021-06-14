import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { SharedModule } from '../common/modules/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackComponent } from './feedback/feedback.component';

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
    FeedbackComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(adminRoutes),
  ]
})
export class EmployeeModule { }
