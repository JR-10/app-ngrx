import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Post } from '../../../domain/models/post/post.model';
import { PostGateway } from '../../../domain/models/post/gateways/post.gateway';
import { PostDTO } from '../../../domain/models/post/post.dto';

@Injectable({
  providedIn: 'root'
})
export class PostAdapterService extends PostGateway {

  private _apiUrl: string;

  constructor(
    private http: HttpClient
  ) {
    super();
    this._apiUrl = `${environment.backend}posts`;
  }

  getPost(): Observable<Array<Post>> {
    const url = `${this._apiUrl}`;
    return this.http.get<Array<Post>>(url);
  }

  getPostById(id: number): Observable<Post> {
    throw new Error('Method not implemented.');
  }

  createPost(bodyCreate: PostDTO): Observable<Post> {
    throw new Error('Method not implemented.');
  }

  updatePost(id: number, bodyUpdate: PostDTO): Observable<Post> {
    throw new Error('Method not implemented.');
  }

  deletePost(id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }

}
