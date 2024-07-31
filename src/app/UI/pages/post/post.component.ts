import { Component, OnInit } from '@angular/core';
import { GetPostUsecase } from '../../../domain/usecase/get-post.usecase';
import { HttpErrorResponse } from '@angular/common/http';
import { Post } from '../../../domain/models/post/post.model';
import { select, Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { selectPost, /*selectPostLoaded */} from '../../../core/store/selectors/post.selectors';
import { loadPost, loadPostSuccess } from '../../../core/store/actions/post.actions';
import { PostState } from '../../../core/store/reducers/post.reducers';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {

  dataPost: Array<Post> = [];
  postList$: Observable<Array<Post>>;

  constructor(
    private store: Store<PostState>,
    // private getPostUsecase: GetPostUsecase,
  ) {
    this.postList$ = this.store.pipe(select(selectPost));
  }

  ngOnInit(): void {
    this.getPostNgRx();
  }


  getPostNgRx(): void {
    this.store.dispatch(loadPost());
    this.postList$.subscribe({
      next: (resp: Array<Post>) => {
        console.log('Valor de Post NgRx', resp);
        this.dataPost = resp;
      },
      error: (_error: HttpErrorResponse) => {
      },
    });
  }



}
