import { createReducer, on } from '@ngrx/store';
import * as SpeciesActions from './species.actions';

export interface SpeciesState {
  speciesList: any[];          // All species loaded
  selectedSpecie: any | null;  // For storing a single species (get by ID)
  loading: boolean;
  error: any | null;

  // Pagination Fields
  pageNumber: number;
  totalPages: number;
  totalElements: number;
}

export const initialState: SpeciesState = {
  speciesList: [],
  selectedSpecie: null,
  loading: false,
  error: null,

  // Pagination defaults
  pageNumber: 0,
  totalPages: 0,
  totalElements: 0,
};

export const speciesReducer = createReducer(
  initialState,

  // ====== LOAD (FIND ALL) ======
  on(SpeciesActions.loadSpecies, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(SpeciesActions.loadSpeciesSuccess, (state, { speciesList, pageNumber, totalPages, totalElements }) => ({
    ...state,
    speciesList,
    pageNumber,
    totalPages,
    totalElements,
    loading: false,
    error: null
  })),

  on(SpeciesActions.loadSpeciesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // ====== CREATE ======
  on(SpeciesActions.createSpecies, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(SpeciesActions.createSpeciesSuccess, (state, { species }) => ({
    ...state,
    speciesList: [...state.speciesList, species],
    loading: false,
    error: null
  })),

  on(SpeciesActions.createSpeciesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // ====== UPDATE ======
  on(SpeciesActions.updateSpecies, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(SpeciesActions.updateSpeciesSuccess, (state, { updatedSpecies }) => {
    const updatedList = state.speciesList.map((item) =>
      item.id === updatedSpecies.id ? updatedSpecies : item
    );
    return {
      ...state,
      speciesList: updatedList,
      loading: false,
      error: null
    };
  }),

  on(SpeciesActions.updateSpeciesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // ====== DELETE ======
  on(SpeciesActions.deleteSpecies, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(SpeciesActions.deleteSpeciesSuccess, (state, { id }) => ({
    ...state,
    speciesList: state.speciesList.filter((s) => s.id !== id),
    loading: false,
    error: null
  })),

  on(SpeciesActions.deleteSpeciesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // ====== GET BY ID ======
  on(SpeciesActions.getSpeciesById, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(SpeciesActions.getSpeciesByIdSuccess, (state, { species }) => ({
    ...state,
    selectedSpecie: species,
    loading: false,
    error: null
  })),

  on(SpeciesActions.getSpeciesByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
