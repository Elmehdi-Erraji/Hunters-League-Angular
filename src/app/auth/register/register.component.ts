import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  form!: FormGroup; // Declare without initializing immediately
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the form inside ngOnInit
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      cin: ['', [Validators.required, Validators.pattern('^[A-Z]{2}[0-9]{6}$')]],
      email: ['', [Validators.required, Validators.email]],
      nationality: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]]
    });
  }

  // Check if a field is invalid
  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  // Get error messages for specific fields
  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);

    if (control?.errors?.['required']) {
      return 'This field is required';
    } else if (control?.errors?.['minlength']) {
      return `Minimum length is ${control.errors['minlength'].requiredLength}`;
    } else if (control?.errors?.['pattern']) {
      return 'Invalid format';
    } else if (control?.errors?.['email']) {
      return 'Invalid email address';
    }
    return '';
  }

  register() {
    if (this.form.valid) {
      this.authService.register(this.form.value).subscribe({
        next: () => {
          // Success message
          this.successMessage = 'Registration Successful!';
          setTimeout(() => {
            this.successMessage = '';
            this.router.navigate(['/login']); // Redirect to login
          }, 3000);
        },
        error: (err) => {
          // Error handling
          console.error('Registration Failed:', err);
          this.errorMessage = err.error.message || 'Registration failed. Please try again.';
          setTimeout(() => {
            this.errorMessage = '';
          }, 5000);
        }
      });
    } else {
      // Form validation errors
      console.error('Form is invalid:', this.form.value);
      this.errorMessage = 'Please fill all fields correctly.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 5000);
    }
  }
}
