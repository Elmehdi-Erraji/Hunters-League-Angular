import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true, // Add standalone
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add schema here
})
export class SidebarComponent { }
