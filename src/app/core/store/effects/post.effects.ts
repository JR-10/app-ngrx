import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as PostActions from '../actions/post.actions';
import { of } from 'rxjs';
import { GetPostUsecase } from '../../../domain/usecase/post/get-post.usecase';
import { DeletePostUsecase } from '../../../domain/usecase/post/delete-post.usecase';
import { CreatePostUsecase } from '../../../domain/usecase/post/create-post.usecase';
import { UpdatePostUsecase } from '../../../domain/usecase/post/update-post.usecase';

@Injectable()
export class PostEffects {
  constructor(
    private actions$: Actions,
    private getPostUsecase: GetPostUsecase,
    private createPostUsecase: CreatePostUsecase,
    private updatePostUsecase: UpdatePostUsecase,
    private deletePostUsecase: DeletePostUsecase,
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


  getPostById = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.getPostById),
      switchMap((post) => {
        return this.getPostUsecase.getPostById(post.payload).pipe(
          map((data) => {
            return PostActions.getPostByIdSuccess({ payload: data });
          }),
          catchError((error) =>
            of(PostActions.getPostByIdFailure({ payload: error }))
          )
        );
      })
    )
  );


  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.createPost),
      switchMap((post) =>
        this.createPostUsecase.createPost(post.payload).pipe(
          map((data) => PostActions.createPostSuccess({ payload: data })),
          catchError((error) =>
            of(PostActions.createPostFailure({ payload: error }))
          )
        )
      )
    )
  );


  updatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.updatePost),
      switchMap((post) =>
        this.updatePostUsecase.updatePost(post.payload.id, post.payload).pipe(
          map((data) => PostActions.updatePostSuccess({ payload: data })),
          catchError((error) =>
            of(PostActions.updatePostFailure({ payload: error }))
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
