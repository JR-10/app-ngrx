import { Observable } from "rxjs";
import { Photos } from "../photos.model";
import { PhotosDTO } from "../photos.dto";

export abstract class PhotosGateway {

  abstract getPhotos(): Observable<Array<Photos>>;
  abstract getPhotosById(id: number): Observable<Photos>;
  abstract createPhotos(bodyCreate: PhotosDTO): Observable<Photos>;

}
