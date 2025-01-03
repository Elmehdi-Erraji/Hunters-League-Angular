import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminSpecyService } from '../services/admin-specy.service';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-specie-create',
  templateUrl: './specie-create.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  styleUrls: ['./specie-create.component.css']
})
export class SpecieCreateComponent {
  specieForm: FormGroup;
  loading = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private specieService: AdminSpecyService,
    private router: Router // Inject Router
  ) {
    // Initialize the form
    this.specieForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', [Validators.required]],
      minimumWeight: [null, [Validators.required, Validators.min(0.01)]],
      difficulty: ['', [Validators.required]],
      points: [null, [Validators.required, Validators.min(1)]]
    });
  }

  // Submit Form
  onSubmit(): void {
    if (this.specieForm.invalid) {
      return; // Stop if the form is invalid
    }

    this.loading = true; // Start loading
    this.successMessage = '';
    this.errorMessage = '';

    const newSpecie = this.specieForm.value;

    this.specieService.createSpecies(newSpecie).subscribe({
      next: (response) => {
        console.log('Specie created successfully:', response);
        this.successMessage = 'Specie created successfully!';
        setTimeout(() => {
          this.router.navigate(['/admin/species/list']); // Redirect to species list after 2 seconds
        }, 2000); // Optional delay to show success message
      },
      error: (error) => {
        console.error('Error creating specie:', error);
        this.errorMessage = 'Failed to create specie. Please try again.';
      },
      complete: () => {
        this.loading = false; // Stop loading
      }
    });
  }

  // Form field getters for validation
  get name() { return this.specieForm.get('name'); }
  get category() { return this.specieForm.get('category'); }
  get minimumWeight() { return this.specieForm.get('minimumWeight'); }
  get difficulty() { return this.specieForm.get('difficulty'); }
  get points() { return this.specieForm.get('points'); }
}
