import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors} from '@angular/common/http'; // Import HTTP client provider

import { routes } from './app.routes';
import {AuthInterceptor} from './core/interceptors/auth.interceptor';
import {provideStore} from '@ngrx/store';
import {speciesReducer} from './store/species/species.reducer';
import {provideEffects} from '@ngrx/effects';
import {SpeciesEffects} from './store/species/species.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),              // Provides routes
    provideHttpClient(
      withInterceptors([AuthInterceptor])
    ),
    provideStore({
      species: speciesReducer,
      // other slices...
    }),
    provideEffects([SpeciesEffects]),// <-- NgRx store providers
  ]
};
