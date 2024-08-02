import { Injectable } from "@angular/core";
import { PhotosGateway } from "../../models/photos/gateways/photos.gateway";

@Injectable({
  providedIn: 'root'
})

export class GetPhotosUsecase {

  constructor(private photosGateway: PhotosGateway) {}

  getPhotos() {
    return this.photosGateway.getPhotos()
  }

  getPhotosById(id: number) {
    return this.photosGateway.getPhotosById(id)
  }

}
