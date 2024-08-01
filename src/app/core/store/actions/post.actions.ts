import { createAction, props } from "@ngrx/store";
import { Post } from "../../../domain/models/post/post.model";
import { PostDTO } from "../../../domain/models/post/post.dto";

// Load Post
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

// Create Post
export const createPost = createAction(
  '[Post] Creste Post',
  props<{ payload: PostDTO }>()
);

export const createPostSuccess = createAction(
  '[Post] Create Post Success',
  props<{ payload: Post }>()
);

export const createPostFailure = createAction(
  '[Post] Create Post Failure',
  props<{ payload: Error }>()
);

// Delete Post
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
