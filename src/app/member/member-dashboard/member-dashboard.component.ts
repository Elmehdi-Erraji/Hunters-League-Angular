import { Component, OnInit } from '@angular/core';
import { MemberCompetitionService } from '../service/member-competition.service';
import { DatePipe, NgForOf } from '@angular/common';

@Component({
  selector: 'app-member-dashboard',
  templateUrl: './member-dashboard.component.html',
  styleUrls: ['./member-dashboard.component.css'],
  imports: [DatePipe, NgForOf],
})
export class MemberDashboardComponent implements OnInit {

  competitions: any[] = []; // Array to store competitions
  currentPage = 0; // Current page number
  pageSize = 3; // Number of items per page
  totalPages = 0; // Total number of pages
  totalElements = 0; // Total number of competitions

  constructor(private competitionService: MemberCompetitionService) {}

  ngOnInit(): void {
    this.loadCompetitions(this.currentPage, this.pageSize);
  }

  // Fetch competitions with pagination
  loadCompetitions(page: number, size: number): void {
    this.competitionService.findAll(page, size).subscribe((response) => {
      // Assign a random image to each competition
      this.competitions = response.competitions.map((competition: any) => {
        return {
          ...competition,
        };
      });
      this.totalPages = response.totalPages;
      this.totalElements = response.totalElements;
    });
  }

  // Navigate to the next page
  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadCompetitions(this.currentPage, this.pageSize);
    }
  }

  // Navigate to the previous page
  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadCompetitions(this.currentPage, this.pageSize);
    }
  }

}
