import { Component, OnInit } from '@angular/core';
import { AdminUserService } from '../services/admin-user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  // Data Variables
  paginatedUsersWithColors: any[] = []; // Users with precomputed colors

  // Pagination Variables
  totalPages = 0;               // Total pages
  currentPage = 0;              // Current active page
  pageSize = 10;                // Number of items per page
  totalElements = 0;            // Total number of elements

  // Loading State
  loading = false;              // Show/hide loading indicator

  constructor(private userService: AdminUserService) {}

  ngOnInit(): void {
    console.log('Component initialized, loading first page...');
    this.getUsers(this.currentPage, this.pageSize); // Load users on component initialization
  }

  // Fetch users with pagination
  getUsers(page: number, size: number): void {
    console.log(`Fetching users for page: ${page}, size: ${size}`);
    this.loading = true; // Show loading spinner

    this.userService.findAll(page, size).subscribe({
      next: (response) => {
        console.log('API response received:', response);

        // Precompute colors and assign to each user
        this.paginatedUsersWithColors = response.map((user: any) => ({
          ...user,
          color: this.getRandomColor() // Assign a random color once
        }));
        console.log('Paginated Users with Colors:', this.paginatedUsersWithColors);

        // Update pagination info
        this.currentPage = page; // Update the current page
        this.totalElements = response.totalElements || 0; // Get total elements
        this.totalPages = Math.ceil(this.totalElements / size); // Calculate total pages
        console.log(`Updated currentPage: ${this.currentPage}, totalPages: ${this.totalPages}`);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.paginatedUsersWithColors = [];
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
      this.getUsers(this.currentPage + 1, this.pageSize);
    } else {
      console.log('Already on the last page, cannot move to next page.');
    }
  }

  // Previous Page
  prevPage(): void {
    console.log('Previous button clicked');
    if (this.currentPage > 0) {
      console.log(`Moving to previous page: ${this.currentPage - 1}`);
      this.getUsers(this.currentPage - 1, this.pageSize);
    } else {
      console.log('Already on the first page, cannot move to previous page.');
    }
  }

  testClick(): void {
    console.log('Test button clicked!');
  }

  // Go to a specific page
  goToPage(page: number): void {
    console.log(`Page number ${page + 1} clicked`);
    if (page >= 0 && page < this.totalPages) {
      this.getUsers(page, this.pageSize);
    } else {
      console.log(`Invalid page number: ${page + 1}`);
    }
  }

  // Generate an array for page numbers
  getPagesArray(): number[] {
    console.log(`Generating page numbers array for totalPages: ${this.totalPages}`);
    return Array.from({ length: this.totalPages }, (_, i) => i); // Generate an array [0, 1, 2, ...]
  }

  editUser(user: any): void {
    console.log('Edit user:', user);
    // Implement edit logic here
  }

  deleteUser(userId: string): void {
    console.log('Delete user with ID:', userId);
    // Implement delete logic here
  }

  // Generate random color for avatars
  getRandomColor(): string {
    const colors = ['#4B5563', '#6B7280', '#9CA3AF', '#D1D5DB', '#E5E7EB']; // Gray shades
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
