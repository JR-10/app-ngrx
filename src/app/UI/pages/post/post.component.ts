import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Post } from '../../../domain/models/post/post.model';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectPost } from '../../../core/store/selectors/post.selectors';
import { loadPost } from '../../../core/store/actions/post.actions';
import { PostState } from '../../../core/store/reducers/post.reducers';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {

  dataPost: Array<Post> = [];
  postList$: Observable<Array<Post>>;

  displayedColumns: string[] = ['userId', 'id', 'title', 'body'];
  dataSource!: MatTableDataSource<Post>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private store: Store<PostState>,
  ) {
    this.postList$ = this.store.pipe(select(selectPost));
  }

  ngOnInit(): void {
    this.getPostNgRx();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  getPostNgRx(): void {
    this.store.dispatch(loadPost());
    this.postList$.subscribe({
      next: (resp: Array<Post>) => {
        console.log('Valor de Post NgRx', resp);
        this.dataPost = resp;
        this.dataSource = new MatTableDataSource(this.dataPost);
        this.dataSource.paginator = this.dataPost.length > 0 ? this.paginator : null;
      },
      error: (_error: HttpErrorResponse) => {
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
