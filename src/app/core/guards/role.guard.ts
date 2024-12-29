import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['roles']; // Get roles from route data
    const userRole = this.authService.getRole(); // Get user's role

    if (expectedRoles.includes(userRole)) {
      return true;
    }
    this.router.navigate(['/login']); // Redirect if unauthorized
    return false;
  }
}
