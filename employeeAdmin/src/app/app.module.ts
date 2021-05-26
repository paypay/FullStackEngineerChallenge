import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { LocalStorageModule } from 'angular-2-local-storage';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { ApiService } from './services/api.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ListEmployeeComponent } from './components/list-employee/list-employee.component';
import { ListReviewsComponent } from './components/list-reviews/list-reviews.component';
import { AuthGuard } from './authguard';
import { AuthGuardLog } from './authguardLogin';
import { TakeReviewComponent } from './components/take-review/take-review.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    ListEmployeeComponent,
    ListReviewsComponent,
    TakeReviewComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule, 
    NgxStarRatingModule, 
    ModalModule.forRoot(),
    LocalStorageModule.forRoot({
      storageType: 'localStorage'
    }),
    BrowserAnimationsModule,
    ToastrModule.forRoot(), 
  ],
  providers: [
    ApiService,
    BsModalService,
    AuthGuard, AuthGuardLog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
