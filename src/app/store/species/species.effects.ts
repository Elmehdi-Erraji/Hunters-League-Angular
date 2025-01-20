import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { loadSpecies, loadSpeciesSuccess, loadSpeciesFailure } from './species.actions';
import { AdminSpecyService } from '../../admin/services/admin-specy.service';

@Injectable()
export class SpeciesEffects {
  constructor(
    private actions$: Actions, // Ensure this is injected correctly
    private adminSpecyService: AdminSpecyService
  ) {
    console.log('SpeciesEffects constructor - actions$:', this.actions$); // Debugging
  }


  // Assign the effect to a class property
  loadSpecies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSpecies),
      mergeMap((action) =>
        this.adminSpecyService.findAll(action.page, action.size).pipe(
          map((response) =>
            loadSpeciesSuccess({
              speciesList: response.species,
              pageNumber: response.pageNumber,
              totalPages: response.totalPages,
              totalElements: response.totalElements,
            })
          ),
          catchError((error) => of(loadSpeciesFailure({ error })))
        )
      )
    )
  );
}
