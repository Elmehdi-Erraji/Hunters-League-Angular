import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {AdminCompetitionService} from '../services/admin-compitition.service';

@Component({
  selector: 'app-competitions-list',
  templateUrl: './competitions-list.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styleUrls: ['./competitions-list.component.css'],
})
export class CompetitionsListComponent implements OnInit {
  paginatedCompetitionsWithColors: any[] = []; // Competitions with precomputed colors

  // Pagination Variables
  totalPages = 0; // Total pages
  currentPage = 0; // Current active page
  pageSize = 5; // Number of items per page
  totalElements = 0; // Total number of elements

  // Loading State
  loading = false; // Show/hide loading indicator

  constructor(
    private competitionService: AdminCompetitionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCompetitions(this.currentPage, this.pageSize); // Load competitions on component initialization
  }

  // Fetch competitions with pagination
  getCompetitions(page: number, size: number): void {
    this.loading = true; // Show loading spinner

    this.competitionService.findAll(page, size).subscribe({
      next: (response) => {
        // Assign response data
        this.paginatedCompetitionsWithColors = response.competitions.map((competition: any) => ({
          ...competition,
          color: this.getRandomColor(), // Assign a random color once
        }));

        // Update pagination info directly from response
        this.currentPage = response.pageNumber;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
      },
      error: (error) => {
        console.error('Error fetching competitions:', error);
        this.paginatedCompetitionsWithColors = [];
        this.totalPages = 0;
      },
      complete: () => {
        this.loading = false; // Turn off loading spinner
      },
    });
  }

  // Next Page
  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.getCompetitions(this.currentPage + 1, this.pageSize);
    }
  }

  // Previous Page
  prevPage(): void {
    if (this.currentPage > 0) {
      this.getCompetitions(this.currentPage - 1, this.pageSize);
    }
  }

  // Generate random color for avatars
  getRandomColor(): string {
    const colors = ['#4B5563', '#6B7280', '#9CA3AF', '#D1D5DB', '#E5E7EB']; // Gray shades
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Edit Competition
  editCompetitions(competition: any): void {
    console.log('Edit competition:', competition);
    this.router.navigate(['/admin/competitions/edit', competition.id]); // Navigate to edit page
  }

  // Delete Competition
  deleteCompetition(competitionId: string): void {
    console.log('Delete competition with ID:', competitionId);
    if (confirm('Are you sure you want to delete this competition?')) {
      this.competitionService.deleteCompetition(competitionId).subscribe({
        next: () => {
          console.log('Competition deleted successfully');
          this.getCompetitions(this.currentPage, this.pageSize); // Refresh the list
        },
        error: (error) => {
          console.error('Error deleting competition:', error);
        },
      });
    }
  }
}
