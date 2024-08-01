import { createReducer, on} from "@ngrx/store";
import * as PostActions from '../actions/post.actions';
import { Post } from "../../../domain/models/post/post.model";


export interface PostState {
  data: any;
  loading: boolean;
  error: any;
}

export const initialPostState: PostState = {
  data: [],
  loading: false,
  error: null
};


export const postReducer = createReducer(
  initialPostState,
  // Load post
  on(PostActions.loadPost, state => {
    return { ...state, loading: true };
  }),
  on(PostActions.loadPostSuccess, (state, {payload}) => {
    return  { ...state, loading: false , data: payload};
  }),
  on(PostActions.loadPostFailure, (state, { payload }) => {
    return { ...state, loading: false, payload: payload};
  }),

  // Create post
  on(PostActions.createPost, state => {
    return {...state, loading: true};
  }),
  on(PostActions.createPostSuccess, (state, {payload}) => {
    return {...state, loading: false, data: payload};
  }),
  on(PostActions.createPostFailure, (state, { payload }) => {
    return { ...state, loading: false, payload: payload};
  }),

  // Delete post
  on(PostActions.deletePost, state => {
    return {...state, loading: true};
  }),
  on(PostActions.deletePostSuccess, (state, {payload}) => {
    return {...state, loading: false, data: state.data.filter((post: Post) => post.id !== payload)};
  }),
  on(PostActions.deletePostFailure, (state, { payload }) => {
    return { ...state, loading: false, payload: payload};
  }),
);
