import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as PothosActions from '../actions/photos.actions';
import { of } from 'rxjs';
import { GetPhotosUsecase } from '../../../domain/usecase/photos/get-photos.usecase';
import { CreatePhotosUsecase } from '../../../domain/usecase/photos/create-photos.usecase';



@Injectable()
export class PhotosEffects {


  constructor(
    private actions$: Actions,
    private getPhotosUsecase: GetPhotosUsecase,
    private createPhotosUsecase: CreatePhotosUsecase,
  ) {}


  loadPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PothosActions.loadPhotos),
      switchMap(() =>
        this.getPhotosUsecase.getPhotos().pipe(
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


  getPhotosById = createEffect(() =>
    this.actions$.pipe(
      ofType(PothosActions.getPhotosById),
      switchMap((photos) => {
        return this.getPhotosUsecase.getPhotosById(photos.id).pipe(
          map((data) => {
            return PothosActions.getPhotosByIdSuccess({ dataPhotos: data });
          }),
          catchError((error) =>
            of(PothosActions.getPothosByIdFailure({ error: error }))
          )
        );
      })
    )
  );


  createPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PothosActions.createPhotos),
      switchMap((photos) =>
        this.createPhotosUsecase.createPhotos(photos.photosDto).pipe(
          map((data) => PothosActions.createPhotosSuccess({ dataPhotos: data })),
          catchError((error) =>
            of(PothosActions.createPhotosFailure({ error: error }))
          )
        )
      )
    )
  );




}
