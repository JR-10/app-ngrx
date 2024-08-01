import { createAction, props } from "@ngrx/store";
import { Post } from "../../../domain/models/post/post.model";

export const loadPost = createAction(
  '[Post] Load Post',
);

export const loadPostSuccess = createAction(
  '[Post] Load Post Success',
  props<{ payload: Array<Post> }>()
);

export const loadPostFailure = createAction(
  '[Post] Load Post Failure',
  props<{ payload: Error }>()
);

export const deletePost = createAction(
  '[Post] Delete Post',
  props<{ payload: number }>()
);

export const deletePostSuccess = createAction(
  '[Post] Delete Post Success',
  props<{ payload: number }>()
);

export const deletePostFailure = createAction(
  '[Post] Delete Post Failure',
  props<{ payload: Error }>()
);
