import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form!: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    if (this.form.valid) {
      const loginData = this.form.value;

      // Login API request
      this.authService.login(loginData).subscribe({
        next: (response) => {
          // Store tokens and role
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('refresh_token', response.refresh_token);
          localStorage.setItem('role', response.role); // Store role

          console.log('Login successful:', response);

          // Redirect based on role
          this.redirectUser(response.role);
        },
        error: (err) => {
          console.error('Login Failed:', err);
          this.errorMessage = err.error.message || 'Invalid username or password.';
          setTimeout(() => {
            this.errorMessage = '';
          }, 5000);
        }
      });
    } else {
      console.error('Form is invalid:', this.form.value);
      this.errorMessage = 'Please fill in valid details.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 5000);
    }
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
        this.router.navigate(['/login']);
        break;
    }
  }
}
