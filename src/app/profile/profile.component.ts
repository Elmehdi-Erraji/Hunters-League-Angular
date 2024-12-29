import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  role: string | null = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Retrieve role from localStorage
    this.role = localStorage.getItem('role');
  }

  logout() {
    // Clear tokens and role
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('role');

    // Redirect to login
    this.router.navigate(['/login']);
  }
}
