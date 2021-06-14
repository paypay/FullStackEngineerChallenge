import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule } from './common/modules/shared/shared.module';
import { HeaderComponent } from './common/components/header/header.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthenticateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
