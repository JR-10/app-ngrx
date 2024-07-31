import { Injectable } from "@angular/core";
import { PothosGateway } from "../../models/photos/gateways/pothos.gateway";

@Injectable({
  providedIn: 'root'
})

export class GetPothosUsecase {

  constructor(private pothosGateway: PothosGateway) {}

  getPost() {
    return this.pothosGateway.getPhotos()
  }

}
