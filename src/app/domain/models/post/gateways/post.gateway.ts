import { Observable } from "rxjs";
import { Post } from "../post.model";
import { PostDTO } from "../post.dto";

export abstract class PostGateway {

  abstract getPost(): Observable<Array<Post>>;
  abstract createPost(bodyCreate: PostDTO): Observable<Post>;
  abstract deletePost(id: number): Observable<any>;

}
