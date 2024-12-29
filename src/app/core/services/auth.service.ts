import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; // Replace with your API URL

  constructor(private http: HttpClient, private router: Router) {}

  // Register
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Login
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        this.setToken(response);
        this.redirectUser(response.role); // Redirect based on role
      })
    );
  }

  // Save tokens and role
  setToken(response: any): void {
    localStorage.setItem('access_token', response.accessToken);
    localStorage.setItem('refresh_token', response.refreshToken);
    localStorage.setItem('role', response.role);
  }

  // Get access token
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Get role
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Logout
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/auth/login']); // Redirect to login page
  }

  // Redirect user based on role
  private redirectUser(role: string): void {
    switch (role) {
      case 'ADMIN':
        this.router.navigate(['/admin']);
        break;
      case 'JURY':
        this.router.navigate(['/jury']);
        break;
      case 'MEMBER':
        this.router.navigate(['/member']);
        break;
      default:
        this.router.navigate(['/auth/login']);
        break;
    }
  }

  // Refresh Token
  refreshToken(): Observable<any> {
    return this.http.post(`${this.apiUrl}/refresh-token`, {
      refreshToken: localStorage.getItem('refresh_token')
    }).pipe(
      tap((response: any) => this.setToken(response))
    );
  }
}
