import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/signin/login.component';
import { AuthGuardService } from './services/auth-guard-service';
import { HistoryComponent } from './components/history/history.component';
import { NasaDashboardComponent } from './components/nasa-dashboard/nasa-dashboard.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'nasa-dashboard', component: NasaDashboardComponent, canActivate: [AuthGuardService] },
  { path: 'history', component: HistoryComponent, canActivate: [AuthGuardService] },
  { path: 'signin', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }