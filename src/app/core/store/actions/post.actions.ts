import { createAction, props } from "@ngrx/store";
import { Post } from "../../../domain/models/post/post.model";

export const loadPost = createAction(
  '[Post] Load Post',
);

export const loadPostSuccess = createAction(
  '[Post] Load Post Success',
  props<{ dataPost: Array<Post> }>()
);

export const loadPostFailure = createAction(
  '[Post] Load Post Failure',
  props<{ error: Error }>()
);
