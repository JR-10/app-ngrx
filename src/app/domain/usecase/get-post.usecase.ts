import { Injectable } from "@angular/core";
import { PostGateway } from "../models/post/gateways/post.gateway";

@Injectable({
  providedIn: 'root'
})

export class GetPostUsecase {

  constructor(private postGateway: PostGateway) {}

  getPost() {
    return this.postGateway.getPost()
  }

}
