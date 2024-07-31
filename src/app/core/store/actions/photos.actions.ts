import { createAction, props } from "@ngrx/store";
import { Photos } from "../../../domain/models/photos/photos.model";

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
