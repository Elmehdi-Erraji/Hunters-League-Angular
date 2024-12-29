import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import {AdminDashboardComponent} from './admin/admin-dashboard/admin-dashboard.component';
import {JuryDashboardComponent} from './jury/jury-dashboard/jury-dashboard.component';
import {MemberDashboardComponent} from './member/member-dashboard/member-dashboard.component';
import {RoleGuard} from './core/guards/role.guard';
import {AuthGuard} from './core/guards/auth.guard';
import {ProfileComponent} from './profile/profile.component';


export const routes: Routes = [
  // Default route
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Auth routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Profile (protected)
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },

  // Admin Dashboard (protected by RoleGuard)
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] }
  },

  // Jury Dashboard
  {
    path: 'jury',
    component: JuryDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['JURY'] }
  },

  // Member Dashboard
  {
    path: 'member',
    component: MemberDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['MEMBER'] }
  },

  // Wildcard route for invalid paths
  { path: '**', redirectTo: 'login' }
];
