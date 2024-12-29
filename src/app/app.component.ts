import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ExampleComponent} from './example/example.component';
import {BrowserModule} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ExampleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-playground';
}
