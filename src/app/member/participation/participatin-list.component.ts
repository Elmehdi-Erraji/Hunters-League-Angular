import { Component, OnInit } from '@angular/core';
import { MemberParticipationService } from '../service/member-participation.service';
import { NgForOf, NgIf } from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-participations-list',
  templateUrl: './participatin-list.component.html',
  imports: [NgForOf, NgIf, FormsModule],
  styleUrls: ['./participatin-list.component.css'],
})
export class ParticipatinListComponent implements OnInit {
  participations: any[] = [];
  loading = false;
  errorMessage: string | null = null;
  isEmpty = false;

  // Pagination Variables
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  totalElements = 0;

  constructor(private participationService: MemberParticipationService) {}

  ngOnInit(): void {
    this.loadParticipations(this.currentPage, this.pageSize);
  }

  loadParticipations(page: number, size: number): void {
    this.loading = true;
    this.errorMessage = null;
    this.isEmpty = false;

    this.participationService.getParticipationsByUser(page, size).subscribe({
      next: (response) => {
        this.participations = response.content; // Update participations with the current page data
        this.totalPages = response.totalPages; // Update total pages
        this.totalElements = response.totalElements; // Update total elements
        this.currentPage = response.pageable.pageNumber; // Update current page

        // Check if the response is empty
        if (response.content.length === 0) {
          this.isEmpty = true;
        }

        this.loading = false;
        console.log('Participations loaded successfully:', response);
      },
      error: (error) => {
        console.error('Error fetching participations:', error);
        this.errorMessage = 'Failed to load participations. Please try again later.';
        this.loading = false;
      },
    });
  }

  // Go to the next page
  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadParticipations(this.currentPage, this.pageSize);
    }
  }

  // Go to the previous page
  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadParticipations(this.currentPage, this.pageSize);
    }
  }

  // Change page size
  changePageSize(size: number): void {
    this.pageSize = size;
    this.currentPage = 0; // Reset to the first page
    this.loadParticipations(this.currentPage, this.pageSize);
  }
}
