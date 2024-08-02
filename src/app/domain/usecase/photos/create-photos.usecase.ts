import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { PhotosGateway } from "../../models/photos/gateways/photos.gateway";
import { Photos } from "../../models/photos/photos.model";
import { PhotosDTO } from "../../models/photos/photos.dto";

@Injectable({
  providedIn: 'root'
})

export class CreatePhotosUsecase {

  constructor(private photosGateway: PhotosGateway) {}

  createPhotos(bodyCreate: PhotosDTO): Observable<Photos> {
    return this.photosGateway.createPhotos(bodyCreate)
  }

}
