import { Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { RegistroComponent } from './core/auth/views/registro/registro.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'registro', component: RegistroComponent }
];
