import { createReducer, on} from "@ngrx/store";
import * as PhotosActions from '../actions/photos.actions';


export interface PhotosState {
  data: any;
  loading: boolean;
  error: any;
}

export const initialPothosState: PhotosState = {
  data: [],
  loading: false,
  error: null
};


export const photosReducer = createReducer(
  initialPothosState,
  on(PhotosActions.loadPhotos, state => {
    return { ...state, loading: true };
  }),
  on(PhotosActions.loadPothosSuccess, (state, {dataPhotos}) => {
    return  { ...state, loading: false , data: dataPhotos};
  }),
  on(PhotosActions.loadPothosFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  })
);
