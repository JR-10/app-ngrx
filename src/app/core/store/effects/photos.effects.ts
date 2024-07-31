import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as PothosActions from '../actions/photos.actions';
import { of } from 'rxjs';
import { GetPothosUsecase } from '../../../domain/usecase/photos/get-photos.usecase';



@Injectable()
export class PhotosEffects {


  constructor(
    private actions$: Actions,
    private getPothosUsecase: GetPothosUsecase,
  ) {}


  loadPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PothosActions.loadPhotos),
      switchMap(() =>
        this.getPothosUsecase.getPost().pipe(
          map(data =>
            PothosActions.loadPothosSuccess({ dataPhotos: data })
          ),
          catchError(error =>
            of(PothosActions.loadPothosFailure({ error }))
          )
        )
      )
    )
  );


}
