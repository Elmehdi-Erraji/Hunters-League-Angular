import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.html'],
  standalone: true, // Add standalone
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add schema here
})
export class HeaderComponent { }
