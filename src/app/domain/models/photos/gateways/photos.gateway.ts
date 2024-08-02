import { Observable } from "rxjs";
import { Photos } from "../photos.model";

export abstract class PhotosGateway {

  abstract getPhotos(): Observable<Array<Photos>>;
  abstract getPhotosById(id: number): Observable<Photos>;

}
