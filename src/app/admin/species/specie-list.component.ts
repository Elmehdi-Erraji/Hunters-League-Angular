import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {deleteSpecies, loadSpecies} from '../../store/species/species.actions';
import {
  selectPageNumber,
  selectSpeciesList,
  selectSpeciesLoading,
  selectTotalElements, selectTotalPages
} from '../../store/species/species.selectors';

// Import your actions & selectors


@Component({
  selector: 'app-specie-list',
  templateUrl: './specie-list.component.html',
  styleUrls: ['./specie-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class SpecieListComponent implements OnInit {
  // Observables
  speciesWithColors$!: Observable<any[]>;
  loading$!: Observable<boolean>;
  totalElements$!: Observable<number>;

  // We'll keep pageNumber & totalPages in local variables for easy next/prev usage
  pageNumber = 0;
  totalPages = 0;
  pageSize = 10; // same as before

  constructor(private store: Store) {}

  ngOnInit(): void {
    console.log('Component initialized, loading first page...');
    // Dispatch an action to load the first page
    this.store.dispatch(loadSpecies({ page: 0, size: this.pageSize }));

    // Subscribe to loading & totalElements
    this.loading$ = this.store.select(selectSpeciesLoading);
    this.totalElements$ = this.store.select(selectTotalElements);

    // Subscribe to pageNumber & totalPages from store, so we can do pagination
    this.store.select(selectPageNumber).subscribe((page) => {
      this.pageNumber = page;
    });
    this.store.select(selectTotalPages).subscribe((pages) => {
      this.totalPages = pages;
    });

    // Subscribe to speciesList and assign random colors on the fly
    this.speciesWithColors$ = this.store.select(selectSpeciesList).pipe(
      map(speciesArray =>
        speciesArray.map(species => ({
          ...species,
          color: this.getRandomColor()
        }))
      )
    );
  }

  // Next Page
  nextPage(): void {
    if (this.pageNumber < this.totalPages - 1) {
      this.store.dispatch(
        loadSpecies({ page: this.pageNumber + 1, size: this.pageSize })
      );
    }
  }

  // Previous Page
  prevPage(): void {
    if (this.pageNumber > 0) {
      this.store.dispatch(
        loadSpecies({ page: this.pageNumber - 1, size: this.pageSize })
      );
    }
  }

  // Go to specific page
  goToPage(page: number): void {
    this.store.dispatch(loadSpecies({ page, size: this.pageSize }));
  }

  // Generate an array for page numbers
  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

  // Generate random color for avatars
  getRandomColor(): string {
    const colors = ['#4B5563', '#6B7280', '#9CA3AF', '#D1D5DB', '#E5E7EB'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Edit species
  editSpecies(species: any): void {
    console.log('Edit species:', species);
    // Could dispatch an update action or navigate to an edit page
  }

  // Delete species
  deleteSpecies(speciesId: string): void {
    console.log('Delete species with ID:', speciesId);
    this.store.dispatch(deleteSpecies({ id: speciesId }));
  }
}
