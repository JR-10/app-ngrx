import { Observable } from "rxjs";
import { Photos } from "../photos.model";

export abstract class PothosGateway {

  abstract getPhotos(): Observable<Array<Photos>>;

}
