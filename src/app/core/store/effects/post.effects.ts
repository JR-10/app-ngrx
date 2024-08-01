import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as PostActions from '../actions/post.actions';
import { of } from 'rxjs';
import { GetPostUsecase } from '../../../domain/usecase/post/get-post.usecase';
import { DeletePostUsecase } from '../../../domain/usecase/post/delete-post.usecase';

@Injectable()
export class PostEffects {
  constructor(
    private actions$: Actions,
    private getPostUsecase: GetPostUsecase,
    private deletePostUsecase: DeletePostUsecase
  ) {}

  loadPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.loadPost),
      switchMap(() =>
        this.getPostUsecase.getPost().pipe(
          map((data) => PostActions.loadPostSuccess({ payload: data })),
          catchError((error) =>
            of(PostActions.loadPostFailure({ payload: error }))
          )
        )
      )
    )
  );

  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.deletePost),
      switchMap((post) =>
        this.deletePostUsecase.deletePost(post.payload).pipe(
          map((data) =>
            PostActions.deletePostSuccess({ payload: data.payload })
          ),
          catchError((error) =>
            of(PostActions.deletePostFailure({ payload: error }))
          )
        )
      )
    )
  );
}
