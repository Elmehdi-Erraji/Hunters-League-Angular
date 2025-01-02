import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminSpecyService} from '../services/admin-specy.service';

@Component({
  selector: 'app-specie-list',
  templateUrl: './specie-list.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./specie-list.component.css']
})
export class SpecieListComponent implements OnInit {
  // Data Variables
  paginatedSpeciesWithColors: any[] = []; // Species with precomputed colors

  // Pagination Variables
  totalPages = 0;               // Total pages
  currentPage = 0;              // Current active page
  pageSize = 10;                // Number of items per page
  totalElements = 0;            // Total number of elements

  // Loading State
  loading = false;              // Show/hide loading indicator

  constructor(private specieService: AdminSpecyService) {}

  ngOnInit(): void {
    console.log('Component initialized, loading first page...');
    this.getSpecies(this.currentPage, this.pageSize); // Load species on component initialization
  }

  // Fetch species with pagination
  getSpecies(page: number, size: number): void {
    console.log(`Fetching species for page: ${page}, size: ${size}`);
    this.loading = true; // Show loading spinner

    this.specieService.findAll(page, size).subscribe({
      next: (response) => {
        console.log('API response received:', response);

        // Precompute colors and assign to each species
        this.paginatedSpeciesWithColors = response.species.map((species: any) => ({
          ...species,
          color: this.getRandomColor() // Assign a random color once
        }));
        console.log('Paginated Species with Colors:', this.paginatedSpeciesWithColors);

        // Update pagination info
        this.currentPage = page; // Update the current page
        this.totalElements = response.totalElements || 0; // Get total elements
        this.totalPages = Math.ceil(this.totalElements / size); // Calculate total pages
        console.log(`Updated currentPage: ${this.currentPage}, totalPages: ${this.totalPages}`);
      },
      error: (error) => {
        console.error('Error fetching species:', error);
        this.paginatedSpeciesWithColors = [];
        this.totalPages = 0;
      },
      complete: () => {
        console.log('API request completed.');
        this.loading = false; // Turn off loading spinner
      }
    });
  }

  // Next Page
  nextPage(): void {
    console.log('Next button clicked');
    if (this.currentPage < this.totalPages - 1) {
      console.log(`Moving to next page: ${this.currentPage + 1}`);
      this.getSpecies(this.currentPage + 1, this.pageSize);
    } else {
      console.log('Already on the last page, cannot move to next page.');
    }
  }

  // Previous Page
  prevPage(): void {
    console.log('Previous button clicked');
    if (this.currentPage > 0) {
      console.log(`Moving to previous page: ${this.currentPage - 1}`);
      this.getSpecies(this.currentPage - 1, this.pageSize);
    } else {
      console.log('Already on the first page, cannot move to previous page.');
    }
  }

  // Go to a specific page
  goToPage(page: number): void {
    console.log(`Page number ${page + 1} clicked`);
    if (page >= 0 && page < this.totalPages) {
      this.getSpecies(page, this.pageSize);
    } else {
      console.log(`Invalid page number: ${page + 1}`);
    }
  }

  // Generate an array for page numbers
  getPagesArray(): number[] {
    console.log(`Generating page numbers array for totalPages: ${this.totalPages}`);
    return Array.from({ length: this.totalPages }, (_, i) => i); // Generate an array [0, 1, 2, ...]
  }

  editSpecies(species: any): void {
    console.log('Edit species:', species);
    // Implement edit logic here
  }

  deleteSpecies(speciesId: string): void {
    console.log('Delete species with ID:', speciesId);
    // Implement delete logic here
  }

  // Generate random color for avatars
  getRandomColor(): string {
    const colors = ['#4B5563', '#6B7280', '#9CA3AF', '#D1D5DB', '#E5E7EB']; // Gray shades
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
