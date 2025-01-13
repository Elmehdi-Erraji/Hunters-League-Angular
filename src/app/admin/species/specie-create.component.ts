import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminSpecyService } from '../services/admin-specy.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-specie-create',
  templateUrl: './specie-create.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  styleUrls: ['./specie-create.component.css'],
})
export class SpecieCreateComponent implements OnInit {
  @Input() specieId?: string; // Input for edit mode
  specieForm: FormGroup;
  loading = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private specieService: AdminSpecyService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Initialize the form
    this.specieForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', [Validators.required]],
      minimumWeight: [null, [Validators.required, Validators.min(0.01)]],
      difficulty: ['', [Validators.required]],
      points: [null, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.specieId = id;
        this.loadSpecieData(id);
      }
    });
  }

  loadSpecieData(id: string): void {
    this.loading = true;
    this.specieService.getSpecieById(id).subscribe({
      next: (specie) => {
        this.specieForm.patchValue(specie);
      },
      error: (error) => {
        console.error('Error loading specie data:', error);
        this.errorMessage = 'Failed to load specie data.';
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.specieForm.invalid) {
      return; // Stop if the form is invalid
    }

    this.loading = true; // Start loading
    this.successMessage = '';
    this.errorMessage = '';

    const specieData = this.specieForm.value;

    if (this.specieId) {
      // Update existing specie
      this.specieService.updateSpecie(this.specieId, specieData).subscribe({
        next: (response) => {
          console.log('Specie updated successfully:', response);
          this.successMessage = 'Specie updated successfully!';
          setTimeout(() => {
            this.router.navigate(['/admin/species/list']);
          }, 2000);
        },
        error: (error) => {
          console.error('Error updating specie:', error);
          this.errorMessage = 'Failed to update specie. Please try again.';
        },
        complete: () => {
          this.loading = false;
        },
      });
    } else {
      // Create new specie
      this.specieService.createSpecies(specieData).subscribe({
        next: (response) => {
          console.log('Specie created successfully:', response);
          this.successMessage = 'Specie created successfully!';
          setTimeout(() => {
            this.router.navigate(['/admin/species/list']);
          }, 2000);
        },
        error: (error) => {
          console.error('Error creating specie:', error);
          this.errorMessage = 'Failed to create specie. Please try again.';
        },
        complete: () => {
          this.loading = false;
        },
      });
    }
  }

  // Form field getters for validation
  get name() {
    return this.specieForm.get('name');
  }
  get category() {
    return this.specieForm.get('category');
  }
  get minimumWeight() {
    return this.specieForm.get('minimumWeight');
  }
  get difficulty() {
    return this.specieForm.get('difficulty');
  }
  get points() {
    return this.specieForm.get('points');
  }
}
