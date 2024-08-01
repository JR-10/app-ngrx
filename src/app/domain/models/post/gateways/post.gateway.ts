import { Observable } from "rxjs";
import { Post } from "../post.model";

export abstract class PostGateway {

  abstract getPost(): Observable<Array<Post>>;
  abstract deletePost(id: number): Observable<any>;

}
