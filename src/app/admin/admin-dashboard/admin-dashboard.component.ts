import { Component, OnInit } from '@angular/core';
import {AdminDashService} from '../services/admin-dash.service';
import {DecimalPipe} from '@angular/common';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
    imports: [
        DecimalPipe,
        RouterLink,

    ]
})
export class AdminDashboardComponent implements OnInit {
  statistics: any = {
    competitions: 1000,
    users: 2007,
    hunts: 111295739,
    participations: 2000003,
  };
  isLoading: boolean = true;

  constructor(private dashboardService: AdminDashService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.dashboardService.fetchStatistics().subscribe(
      (data: any) => {
        this.dashboardService.updateStatistics(data); // Update the service with fetched data
        this.statistics = this.dashboardService.getStatistics(); // Update the component's statistics
        this.isLoading = false; // Data has been loaded
      },
      (error: any) => {
        console.error('Error fetching statistics:', error);
        this.isLoading = false; // Stop loading even if there's an error
      }
    );
  }
}
