import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {AdminCompetitionService} from '../services/admin-compitition.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-competition-create',
  templateUrl: './competition-create.component.html',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ], // Add necessary imports like ReactiveFormsModule, NgIf
  styleUrls: ['./competition-create.component.css'],
})
export class CompetitionCreateComponent implements OnInit {
  @Input() competitionId?: string; // Input for edit mode
  competitionForm: FormGroup;
  loading = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private competitionService: AdminCompetitionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Initialize the form
    this.competitionForm = this.fb.group({
      code: ['', [Validators.required]],
      location: ['', [Validators.required]],
      date: ['', [Validators.required]],
      speciesType: ['', [Validators.required]],
      minParticipants: [null, [Validators.required, Validators.min(1)]],
      maxParticipants: [null, [Validators.required, Validators.min(1)]],
      openRegistration: [false, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.competitionId = id;
        this.loadCompetitionData(id);
      }
    });
  }

  loadCompetitionData(id: string): void {
    this.loading = true;
    this.competitionService.getCompetitionById(id).subscribe({
      next: (competition) => {
        // Format date to match the input field
        const formattedDate = new Date(competition.date).toISOString().slice(0, 16);
        this.competitionForm.patchValue({ ...competition, date: formattedDate });
      },
      error: (error) => {
        console.error('Error loading competition data:', error);
        this.errorMessage = 'Failed to load competition data.';
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.competitionForm.invalid) {
      return; // Stop if the form is invalid
    }

    this.loading = true; // Start loading
    this.successMessage = '';
    this.errorMessage = '';

    const competitionData = this.competitionForm.value;

    if (this.competitionId) {
      // Update existing competition
      this.competitionService.updateCompetition(this.competitionId, competitionData).subscribe({
        next: (response) => {
          console.log('Competition updated successfully:', response);
          this.successMessage = 'Competition updated successfully!';
          setTimeout(() => {
            this.router.navigate(['/admin/competitions/list']);
          }, 2000);
        },
        error: (error) => {
          console.error('Error updating competition:', error);
          this.errorMessage = 'Failed to update competition. Please try again.';
        },
        complete: () => {
          this.loading = false;
        },
      });
    } else {
      // Create new competition
      this.competitionService.createCompetition(competitionData).subscribe({
        next: (response) => {
          console.log('Competition created successfully:', response);
          this.successMessage = 'Competition created successfully!';
          setTimeout(() => {
            this.router.navigate(['/admin/competitions/list']);
          }, 2000);
        },
        error: (error) => {
          console.error('Error creating competition:', error);
          this.errorMessage = 'Failed to create competition. Please try again.';
        },
        complete: () => {
          this.loading = false;
        },
      });
    }
  }

  // Form field getters for validation
  get code() {
    return this.competitionForm.get('code');
  }
  get location() {
    return this.competitionForm.get('location');
  }
  get date() {
    return this.competitionForm.get('date');
  }
  get speciesType() {
    return this.competitionForm.get('speciesType');
  }
  get minParticipants() {
    return this.competitionForm.get('minParticipants');
  }
  get maxParticipants() {
    return this.competitionForm.get('maxParticipants');
  }
  get openRegistration() {
    return this.competitionForm.get('openRegistration');
  }
}
