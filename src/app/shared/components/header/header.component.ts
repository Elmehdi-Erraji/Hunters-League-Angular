import { Component, EventEmitter, Output } from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [
    NgClass
  ],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>(); // Emits event to toggle sidebar
  darkMode: boolean = false;

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
  }

  logout() {
    localStorage.clear();
    window.location.href = '/login'; // Redirect to login page
  }
}
