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


// Get Post By Id
export const getPostById = createAction(
  '[Post] Get Post ById',
  props<{ payload: number }>()
);

export const getPostByIdSuccess = createAction(
  '[Post] Get Post ById Success',
  props<{ payload: Post }>()
);

export const getPostByIdFailure = createAction(
  '[Post] Get Post ById Failure',
  props<{ payload: Error }>()
);


// Create Post
export const createPost = createAction(
  '[Post] Create Post',
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


// Update Post
export const updatePost = createAction(
  '[Post] Update Post',
  props<{ payload: Post }>()
);

export const updatePostSuccess = createAction(
  '[Post] Update Post Success',
  props<{ payload: Post }>()
);

export const updatePostFailure = createAction(
  '[Post] Update Post Failure',
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
