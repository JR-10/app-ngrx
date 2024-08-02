import { Injectable } from "@angular/core";
import { PostGateway } from "../../models/post/gateways/post.gateway";
import { Post } from "../../models/post/post.model";
import { Observable } from "rxjs/internal/Observable";
import { PostDTO } from "../../models/post/post.dto";

@Injectable({
  providedIn: 'root'
})

export class UpdatePostUsecase {

  constructor(private postGateway: PostGateway) {}

  updatePost(id: number, bodyUpdate: PostDTO): Observable<Post> {
    return this.postGateway.updatePost(id, bodyUpdate)
  }

}
