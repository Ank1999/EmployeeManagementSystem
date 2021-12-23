import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullwidthComponent } from './fullwidth.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from 'src/app/modules/login/login.component';
import { SignupComponent } from 'src/app/modules/signup/signup.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    FullwidthComponent,
    LoginComponent,
    SignupComponent
  ], 
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule,
    HttpClientModule
  ],
 
})
export class FullwidthModule { }
