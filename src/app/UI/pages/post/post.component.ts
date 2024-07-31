import { Component } from '@angular/core';
import { GetPostUsecase } from '../../../domain/usecase/get-post.usecase';
import { HttpErrorResponse } from '@angular/common/http';
import { Post } from '../../../domain/models/post/post.model';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {

  dataPost: Array<Post> = [];

  constructor(
    private getPostUsecase: GetPostUsecase,
  ) {
    this.getPost();
  }


  getPost(): void {
    this.getPostUsecase.getPost()?.subscribe({
      next: (resp: Array<Post>) => {
        console.log('Valor de Post', resp);
        this.dataPost = resp;
      },
      error: (_error: HttpErrorResponse) => {
      },
    });
  }


}
