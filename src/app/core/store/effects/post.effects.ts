import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as PostActions from '../actions/post.actions';
import { of } from 'rxjs';
import { GetPostUsecase } from '../../../domain/usecase/post/get-post.usecase';



@Injectable()
export class PostEffects {


  constructor(
    private actions$: Actions,
    private getPostUsecase: GetPostUsecase,
  ) {}


  loadPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.loadPost),
      switchMap(() =>
        this.getPostUsecase.getPost().pipe(
          map(data =>
            PostActions.loadPostSuccess({ dataPost: data })
          ),
          catchError(error =>
            of(PostActions.loadPostFailure({ error }))
          )
        )
      )
    )
  );


}
