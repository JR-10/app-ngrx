import { createAction, props } from "@ngrx/store";
import { Photos } from "../../../domain/models/photos/photos.model";
import { PhotosDTO } from "../../../domain/models/photos/photos.dto";

// Load Photos
export const loadPhotos = createAction(
  '[Photos] Load Photos',
);

export const loadPothosSuccess = createAction(
  '[Photos] Load Photos Success',
  props<{ dataPhotos: Array<Photos> }>()
);

export const loadPothosFailure = createAction(
  '[Photos] Load Photos Failure',
  props<{ error: Error }>()
);


// Get Photos By Id
export const getPhotosById = createAction(
  '[Photos] Get Photos ById',
  props<{ id: number }>()
);

export const getPhotosByIdSuccess = createAction(
  '[Photos] Get Photos ById Success',
  props<{ dataPhotos: Photos }>()
);

export const getPothosByIdFailure = createAction(
  '[Photos] Get Photos ById Failure',
  props<{ error: Error }>()
);


// Create Photos
export const createPhotos = createAction(
  '[Photos] Create Photos',
  props<{ photosDto: PhotosDTO }>()
);

export const createPhotosSuccess = createAction(
  '[Photos] Create Photos Success',
  props<{ dataPhotos: Photos }>()
);

export const createPhotosFailure = createAction(
  '[Photos] Create Photos Failure',
  props<{ error: Error }>()
);

