import { Routes } from '@angular/router';
import {TestComponent} from './test/test.component';
import {ProfileComponent} from './profile/profile.component';

export const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'test', component: TestComponent },
  {path: 'profile', component: ProfileComponent},
 ];
