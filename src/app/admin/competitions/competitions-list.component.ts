import { Component } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {AdminCompititionService} from '../services/admin-compitition.service';

@Component({
  selector: 'app-competitions-list',
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './competitions-list.component.html',
  styleUrl: './competitions-list.component.css'
})
export class CompetitionsListComponent {
  paginatedCompetitionsWithColors : any[] = [];

  totalPages = 0;
  currentPage = 0;
  pageSize = 5;
  totalElements = 0;

  loading = false;

  constructor(private competitionService: AdminCompititionService) {}

  ngOnInit() :void{
    this.getCompetitions(this.currentPage,this.pageSize);
  }

  getCompetitions(page:number, size: number):void{
    this.loading = true;

    this.competitionService.findAll(page, size).subscribe({
      next: (response) => {
        this.paginatedCompetitionsWithColors = response.competitions.map((compitions:any)=>({
          ...compitions,
          color : this.getRandomColor()
        }));
        this.currentPage = response.pageNumber;
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;
      },
      error:(error) => {
        console.error('Error fetching competions', error);
        this.paginatedCompetitionsWithColors = [];
        this.totalPages = 0;
      },
      complete:()=> {
        this.loading = false;
      }
    });
  }
  getRandomColor(): string {
    const colors = ['#4B5563', '#6B7280', '#9CA3AF', '#D1D5DB', '#E5E7EB']; // Gray shades
    return colors[Math.floor(Math.random() * colors.length)];
  }

  nextPage():void{
    if(this.currentPage < this.totalPages -1 ){
      this.getCompetitions(this.currentPage +1,this.pageSize);
    }
  }

  prevPage():void{
    if(this.currentPage > 0){
      this.getCompetitions(this.currentPage -1,this.pageSize);
    }
  }

  editCompetitions(competition: any):void{
    console.log('edit competition:',competition);
  }
  deleteCompetition(competitionId:string):void{
    console.log('deleting competition:',competitionId);
  }
}
