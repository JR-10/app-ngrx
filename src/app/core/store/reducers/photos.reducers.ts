import { createReducer, on} from "@ngrx/store";
import * as PhotosActions from '../actions/photos.actions';
import { Photos } from "../../../domain/models/photos/photos.model";


export interface PhotosState {
  data: any;
  editdata: Photos;
  loading: boolean;
  error: any;
}

export const initialPothosState: PhotosState = {
  data: [],
  editdata : {
    albumId: 0,
    id: 0,
    title: "",
    url: "",
    thumbnailUrl: ""
  },
  loading: false,
  error: null
};


export const photosReducer = createReducer(
  initialPothosState,

  // Load Photos
  on(PhotosActions.loadPhotos, state => {
    return { ...state, loading: true };
  }),
  on(PhotosActions.loadPothosSuccess, (state, {dataPhotos}) => {
    return  { ...state, loading: false , data: dataPhotos};
  }),
  on(PhotosActions.loadPothosFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),


  // Get Photos by id
  on(PhotosActions.getPhotosByIdSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      editdata: action.dataPhotos
    };
  }),


);
