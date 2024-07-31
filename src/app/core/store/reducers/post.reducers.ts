import { createReducer, on} from "@ngrx/store";
import * as PostActions from '../actions/post.actions';


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
  on(PostActions.loadPost, state => {
    return { ...state, loading: true };
  }),
  on(PostActions.loadPostSuccess, (state, {dataPost}) => {
    return  { ...state, loading: false , data: dataPost};
  }),
  on(PostActions.loadPostFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  })
);
