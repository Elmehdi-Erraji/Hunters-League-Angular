//Imports the Component decorator from Angular core, which is required to define a component.
import { Component } from '@angular/core';
import {NgFor, NgIf} from '@angular/common';

//Decorator
@Component({
  selector: 'app-example',
  imports: [NgIf, NgFor],
  templateUrl: './example.component.html',
  standalone: true,
  styleUrl: './example.component.css'
})
export class ExampleComponent {
  // property binding
  title: string = 'Angular component';
  names: string[] = ['Component', 'Angular'];

  // event binding
  count: number = 0;

  //method to increment count
  increment(){
    this.count++;
  }
  decrement(){
    this.count--;
  }

  protected readonly name = name;
}
