import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgIf, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  imports: [
    RouterOutlet,
    NgIf,
    RouterLink,
    RouterLinkActive
  ],
  styleUrls: ['./admin-layout.component.css'],
  standalone: true
})
export class AdminLayoutComponent {
  isSidebarOpen = true;
  isMobile = false;
  isDropdownOpen = false;
  isMessagesDropdownOpen = false;
  isNotificationsDropdownOpen = false;

  dropdowns: { [key: string]: boolean } = {
    members: false,
    species: false,
    competitions: false,
    participations: false,
    hunts: false,
    results: false
  };



  constructor(private router: Router) {}

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('document:click', ['$event'])
  closeDropdowns(event: Event) {
    const target = event.target as HTMLElement;

    // Close sidebar if clicked outside in mobile mode
    if (this.isMobile && this.isSidebarOpen && !target.closest('.fixed') && !target.closest('.toggle-button')) {
      this.isSidebarOpen = false;
    }

    // Close dropdowns if clicked outside
    if (!target.closest('.relative')) {
      this.isDropdownOpen = false;
      this.isMessagesDropdownOpen = false;
      this.isNotificationsDropdownOpen = false;
    }
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
    if (!this.isMobile) {
      this.isSidebarOpen = true;
    } else {
      this.isSidebarOpen = false;
    }
  }

  // Sidebar toggle
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // Profile dropdown toggle
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.isMessagesDropdownOpen = false;
    this.isNotificationsDropdownOpen = false;
  }

  // Messages dropdown toggle
  toggleMessagesDropdown() {
    this.isMessagesDropdownOpen = !this.isMessagesDropdownOpen;
    this.isNotificationsDropdownOpen = false;
    this.isDropdownOpen = false;
  }

  // Notifications dropdown toggle
  toggleNotificationsDropdown() {
    this.isNotificationsDropdownOpen = !this.isNotificationsDropdownOpen;
    this.isMessagesDropdownOpen = false;
    this.isDropdownOpen = false;
  }

  // Sidebar dropdown toggle
  toggleSidebarDropdown(section: string) {
    // Close all other dropdowns
    for (const key in this.dropdowns) {
      if (key !== section) {
        this.dropdowns[key] = false;
      }
    }
    // Toggle the clicked dropdown
    this.dropdowns[section] = !this.dropdowns[section];
  }

  logout() {
    // Clear tokens and role
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('role');

    // Redirect to login
    this.router.navigate(['/login']);
  }
}
