import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {HeaderComponent} from '../shared/components/header/header.component';
import {SidebarComponent} from '../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [
    HeaderComponent,
    SidebarComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileComponent {
  constructor() {
    // Wait for DOM to load completely
    document.addEventListener('DOMContentLoaded', () => {
      console.log('DOM fully loaded and parsed!');

      /** ==============================================
       *  Sidebar Toggle
       * ============================================== */
      const sidebarToggleButton = document.getElementById('sidebar-toggle'); // Button
      const sidebar = document.getElementById('left-sidebar'); // Sidebar

      if (!sidebarToggleButton || !sidebar) {
        console.error('Sidebar or toggle button not found!');
      } else {
        console.log('Sidebar toggle initialized!');
        sidebarToggleButton.addEventListener('click', () => {
          sidebar.classList.toggle('collapsed'); // Toggle collapsed class
        });
      }

      /** ==============================================
       *  Light/Dark Mode Toggle
       * ============================================== */
      const themeToggleButton = document.getElementById('light-dark-mode');
      if (themeToggleButton) {
        const isDarkMode = localStorage.getItem('theme') === 'dark';
        if (isDarkMode) {
          document.body.setAttribute('data-bs-theme', 'dark');
        }
        themeToggleButton.addEventListener('click', () => {
          const currentTheme = document.body.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
          document.body.setAttribute('data-bs-theme', currentTheme);
          localStorage.setItem('theme', currentTheme);
        });
      }
    });
  }
}
