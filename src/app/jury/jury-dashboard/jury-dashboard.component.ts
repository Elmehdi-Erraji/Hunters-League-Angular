import { Component } from '@angular/core';
import {SidebarComponent} from '../../shared/components/sidebar/sidebar.component';
import {HeaderComponent} from '../../shared/components/header/header.component';

@Component({
  selector: 'app-jury-dashboard',
  imports: [
    SidebarComponent,
    HeaderComponent
  ],
  templateUrl: './jury-dashboard.component.html',
  styleUrl: './jury-dashboard.component.css'
})
export class JuryDashboardComponent {

}
