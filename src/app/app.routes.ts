import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import {AdminDashboardComponent} from './admin/admin-dashboard/admin-dashboard.component';
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
import {HuntListComponent} from './admin/hunts/hunt-list.component';
import {CompetitionsListComponent} from './admin/competitions/competitions-list.component';
import {ParticipationListComponent} from './admin/participations/participation-list.component';
import {ParticipationCreateComponent} from './admin/participations/participation-create.component';
import {CompetitionCreateComponent} from './admin/competitions/competition-create.component';


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
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'users/list', component: UserListComponent },
      { path: 'users/create', component: UserCreateComponent },
      { path: 'species/list', component: SpecieListComponent },
      { path: 'species/create', component: SpecieCreateComponent },
      { path: 'species/edit/:id', component: SpecieCreateComponent },
      { path: 'hunts/list', component:  HuntListComponent},
      { path: 'competitions/create', component: CompetitionCreateComponent },
      { path: 'competitions/list', component: CompetitionsListComponent },
      { path: 'competitions/edit/:id', component: CompetitionCreateComponent },
      { path: 'participations/list', component: ParticipationListComponent },
      { path: 'participations/create', component: ParticipationCreateComponent },
    ]
  },

  // Jury Dashboard (protected by RoleGuard)
  {
    path: 'jury',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['JURY'] },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },

    ]
  },

  {
    path: 'member',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['MEMBER'] },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: MemberDashboardComponent },

    ]
  },




  // Wildcard route for invalid paths
  { path: '**', redirectTo: 'login' }
];
