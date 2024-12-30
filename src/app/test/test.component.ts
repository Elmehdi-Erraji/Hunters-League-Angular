import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-test',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestComponent {}
