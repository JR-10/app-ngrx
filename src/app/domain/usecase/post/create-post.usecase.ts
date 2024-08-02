import { Injectable } from "@angular/core";
import { PostGateway } from "../../models/post/gateways/post.gateway";
import { Post } from "../../models/post/post.model";
import { Observable } from "rxjs/internal/Observable";
import { PostDTO } from "../../models/post/post.dto";

@Injectable({
  providedIn: 'root'
})

export class CreatePostUsecase {

  constructor(private postGateway: PostGateway) {}

  createPost(bodyCreate: PostDTO): Observable<Post> {
    return this.postGateway.createPost(bodyCreate)
  }

}
