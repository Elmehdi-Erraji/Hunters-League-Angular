import { Component, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add schema here
})
export class ProfileComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    setTimeout(() => {
      /** ==============================================
       *  Light/Dark Mode Toggle
       * ============================================== */
      const themeToggleButton = document.getElementById('light-dark-mode');

      if (!themeToggleButton) {
        console.error('Theme toggle button not found!');
      } else {
        // Check current theme from localStorage
        const isDarkMode = localStorage.getItem('theme') === 'dark';
        if (isDarkMode) {
          document.body.setAttribute('data-bs-theme', 'dark');
        }

        // Add click event listener for toggling theme
        themeToggleButton.addEventListener('click', () => {
          const currentTheme = document.body.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
          document.body.setAttribute('data-bs-theme', currentTheme);
          localStorage.setItem('theme', currentTheme); // Save the theme preference
        });
      }
    }, 0); // Ensure DOM is rendered before executing the logic
  }
}
