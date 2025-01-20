import { createAction, props } from '@ngrx/store';

/**
 * Load (Find All) with Pagination
 */
export const loadSpecies = createAction(
  '[Species] Load Species',
  props<{ page: number; size: number }>()
);

export const loadSpeciesSuccess = createAction(
  '[Species] Load Species Success',
  props<{
    speciesList: any[];
    pageNumber: number;
    totalPages: number;
    totalElements: number;
  }>()
);

export const loadSpeciesFailure = createAction(
  '[Species] Load Species Failure',
  props<{ error: any }>()
);

/**
 * Create
 */
export const createSpecies = createAction(
  '[Species] Create Species',
  props<{ species: any }>()
);

export const createSpeciesSuccess = createAction(
  '[Species] Create Species Success',
  props<{ species: any }>()
);

export const createSpeciesFailure = createAction(
  '[Species] Create Species Failure',
  props<{ error: any }>()
);

/**
 * Update
 */
export const updateSpecies = createAction(
  '[Species] Update Species',
  props<{ id: string; species: any }>()
);

export const updateSpeciesSuccess = createAction(
  '[Species] Update Species Success',
  props<{ updatedSpecies: any }>()
);

export const updateSpeciesFailure = createAction(
  '[Species] Update Species Failure',
  props<{ error: any }>()
);

/**
 * Delete
 */
export const deleteSpecies = createAction(
  '[Species] Delete Species',
  props<{ id: string }>()
);

export const deleteSpeciesSuccess = createAction(
  '[Species] Delete Species Success',
  props<{ id: string }>()
);

export const deleteSpeciesFailure = createAction(
  '[Species] Delete Species Failure',
  props<{ error: any }>()
);

/**
 * Get by ID
 */
export const getSpeciesById = createAction(
  '[Species] Get Species By Id',
  props<{ id: string }>()
);

export const getSpeciesByIdSuccess = createAction(
  '[Species] Get Species By Id Success',
  props<{ species: any }>()
);

export const getSpeciesByIdFailure = createAction(
  '[Species] Get Species By Id Failure',
  props<{ error: any }>()
);
