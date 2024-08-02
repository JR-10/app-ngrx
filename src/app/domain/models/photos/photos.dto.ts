import { Photos } from "./photos.model";

export interface PhotosDTO extends Omit<Photos, 'id'> {}
