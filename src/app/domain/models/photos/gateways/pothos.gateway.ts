import { Observable } from "rxjs";
import { Pothos } from "../pothos.model";

export abstract class PothosGateway {

  abstract getPhotos(): Observable<Array<Pothos>>;

}
