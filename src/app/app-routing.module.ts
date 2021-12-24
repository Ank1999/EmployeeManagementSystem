import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth-guard.guard';
import { DefaultComponent } from './layout/default/default.component';
import { FullwidthComponent } from './layout/fullwidth/fullwidth.component';
import { FullwidthModule } from './layout/fullwidth/fullwidth.module';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/login/login.component';
import { SignupComponent } from './modules/signup/signup.component';

const routes: Routes = [{
  path: 'user',
  component: DefaultComponent,
  children: [{
    path: 'dash',
    component: DashboardComponent, canActivate: [AuthGuardGuard]
  },]
}, {
  path: 'manager',
  component: FullwidthComponent,
  children: [{
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: SignupComponent
  }]
},
{ path: '', redirectTo: 'manager/login', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
