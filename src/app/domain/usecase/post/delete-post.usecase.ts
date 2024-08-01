import { Injectable } from "@angular/core";
import { PostGateway } from "../../models/post/gateways/post.gateway";

@Injectable({
  providedIn: 'root'
})

export class DeletePostUsecase {

  constructor(private postGateway: PostGateway) {}

  deletePost(id: number) {
    return this.postGateway.deletePost(id);
  }

}
