import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PhotosState } from '../reducers/photos.reducers';

export const selectPhotosFeature = createFeatureSelector<PhotosState>('photos');


export const selectPhotos = createSelector(
  selectPhotosFeature,
  (state: PhotosState) => state.data
);

export const selectPhotosError = createSelector(
  selectPhotosFeature,
  (state: PhotosState) => state.error
);

