// store/index.ts
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { speciesReducer } from './species/species.reducer';
import { SpeciesEffects } from './species/species.effects';

export const appStoreProviders = [
  provideStore({
    // Add the species slice here
    species: speciesReducer,
    // other slices...
  }),
  provideEffects([SpeciesEffects]),
];
