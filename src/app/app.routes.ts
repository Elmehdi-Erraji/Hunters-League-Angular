import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import {AdminDashboardComponent} from './admin/admin-dashboard/admin-dashboard.component';
// import {JuryDashboardComponent} from './jury/jury-dashboard/jury-dashboard.component';
import {MemberDashboardComponent} from './member/member-dashboard/member-dashboard.component';
import {RoleGuard} from './core/guards/role.guard';
import {AuthGuard} from './core/guards/auth.guard';
import {ProfileComponent} from './profile/profile.component';
import {TestComponent} from './member/test/test.component';
import {AdminLayoutComponent} from './layout/admin-layout/admin-layout.component';
import {UserListComponent} from './admin/users/user-list.component';
import {UserCreateComponent} from './admin/users/user-create.component';
import {SpecieListComponent} from './admin/species/specie-list.component';
import {SpecieCreateComponent} from './admin/species/specie-create.component';


export const routes: Routes = [
  // Default route
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'test', component: TestComponent },

  // Auth routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Profile (protected)
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },

  // Admin Dashboard (protected by RoleGuard)
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Default redirect to dashboard
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'users/list', component: UserListComponent },
      { path: 'users/create', component: UserCreateComponent },
      { path: 'species/list', component: SpecieListComponent },
      { path: 'species/create', component: SpecieCreateComponent }// Admin Dashboard
    ]
  },

  // // Jury Dashboard
  // {
  //   path: 'jury',
  //   // component: JuryDashboardComponent,
  //   canActivate: [AuthGuard, RoleGuard],
  //   data: { roles: ['JURY'] }
  // },

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
