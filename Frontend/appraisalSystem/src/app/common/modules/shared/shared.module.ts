import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './angular-material.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule
  ],
  exports: [MaterialModule]
})
export class SharedModule { }
