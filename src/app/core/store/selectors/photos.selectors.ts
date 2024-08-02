import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PhotosState } from '../reducers/photos.reducers';

export const selectPhotosFeature = createFeatureSelector<PhotosState>('photos');



export const getPhotosList = createSelector(
  selectPhotosFeature, (state: PhotosState) => state.data
);

export const getPhotosEdit = createSelector(
  selectPhotosFeature, (state: PhotosState) => state.editdata
);

