// species.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SpeciesState } from './species.reducer';

// 1. Create a feature selector for the 'species' slice in the store
export const selectSpeciesState =
  createFeatureSelector<SpeciesState>('species');

// 2. Basic selector for the species array
export const selectSpeciesList = createSelector(
  selectSpeciesState,
  (state) => state.speciesList
);

// 3. Selectors for individual properties, including pagination
export const selectPageNumber = createSelector(
  selectSpeciesState,
  (state) => state.pageNumber
);

export const selectTotalPages = createSelector(
  selectSpeciesState,
  (state) => state.totalPages
);

export const selectTotalElements = createSelector(
  selectSpeciesState,
  (state) => state.totalElements
);

// 4. Optional: loading and error states
export const selectSpeciesLoading = createSelector(
  selectSpeciesState,
  (state) => state.loading
);

export const selectSpeciesError = createSelector(
  selectSpeciesState,
  (state) => state.error
);
