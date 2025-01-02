// import {Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Output} from '@angular/core';
//
// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css'],
//   schemas: [CUSTOM_ELEMENTS_SCHEMA]
//
// })
// export class HeaderComponent implements OnInit {
//   currentTheme: string = 'light'; // Default theme
//   @Output() toggleSidebar: EventEmitter<void> = new EventEmitter<void>();
//
//   ngOnInit(): void {
//     // Initialize theme from localStorage
//     const savedTheme = localStorage.getItem('theme') || 'light';
//     this.currentTheme = savedTheme;
//     document.body.setAttribute('data-bs-theme', savedTheme); // Apply saved theme
//
//     // Attach event listener for dark/light mode toggle
//     const themeToggleButton = document.getElementById('light-dark-mode');
//     if (themeToggleButton) {
//       themeToggleButton.addEventListener('click', () => this.toggleTheme());
//     }
//   }
//
//   toggleTheme(): void {
//     // Toggle between 'light' and 'dark'
//     this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
//     document.body.setAttribute('data-bs-theme', this.currentTheme); // Apply theme
//     localStorage.setItem('theme', this.currentTheme); // Save theme in localStorage
//   }
//
//   toggleMenu(): void {
//     this.toggleSidebar.emit(); // Emit event to parent component
//   }
// }
