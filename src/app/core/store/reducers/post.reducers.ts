import { createReducer, on} from "@ngrx/store";
import * as PostActions from '../actions/post.actions';
import { Post } from "../../../domain/models/post/post.model";


export interface PostState {
  data: any;
  editdata: Post;
  loading: boolean;
  error: any;
}

export const initialPostState: PostState = {
  data: [],
  editdata : {
    userId: 0,
    id: 0,
    title: "",
    body: ""
  },
  loading: false,
  error: null
};


export const postReducer = createReducer(
  initialPostState,

  // Load post
  on(PostActions.loadPostSuccess, (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
      data: action.payload,
      editdata: {
        userId: 0,
        id: 0,
        title: "",
        body: ""
      }
    };
  }),


  // Get post by id
  on(PostActions.getPostByIdSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      editdata: action.payload
    };
  }),


  // Create post
  on(PostActions.createPostSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      data: action.payload
    };
  }),


  // Update post
  on(PostActions.updatePostSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      data: action.payload
    };
  }),


  // Delete post
  on(PostActions.deletePostSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      data: state.data.filter((post: Post) => post.id !== action.payload)};
  }),

);
