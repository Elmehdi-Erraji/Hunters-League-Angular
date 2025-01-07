import { Component, HostListener, OnInit } from '@angular/core';
import { NgIf, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  imports: [
    NgIf,
    NgOptimizedImage
  ]
})
export class TestComponent implements OnInit {
  isSidebarOpen = true; // Sidebar state
  isMobile = false; // Mobile check
  isDropdownOpen = false; // Header dropdown state
  dropdowns: { [key: string]: boolean } = {
    competitions: false,
    members: false,
    results: false
  }; // Sidebar dropdown states

  ngOnInit() {
    this.checkScreenSize(); // Initial check
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    const target = event.target as HTMLElement;

    // Close header dropdown if clicked outside
    if (!target.closest('.relative')) {
      this.isDropdownOpen = false;
    }
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768; // Detect if mobile size
    if (!this.isMobile) {
      this.isSidebarOpen = true; // Always open sidebar on desktop
    } else {
      this.isSidebarOpen = false; // Automatically close sidebar on mobile
    }
  }

  // Sidebar toggle
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // Header dropdown toggle
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Sidebar dropdown toggle
  toggleSidebarDropdown(section: string) {
    this.dropdowns[section] = !this.dropdowns[section];
  }
}
