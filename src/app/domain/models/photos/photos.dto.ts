import { Photos } from "./photos.model";

export interface PothosDTO extends Omit<Photos, 'id'> {}
