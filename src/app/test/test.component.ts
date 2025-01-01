import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {HeaderComponent} from '../shared/components/header/header.component';

@Component({
  selector: 'app-test',
  imports: [
    NgOptimizedImage,
    HeaderComponent
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestComponent {}
