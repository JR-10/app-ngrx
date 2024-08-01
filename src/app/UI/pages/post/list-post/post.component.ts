import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Post } from '../../../../domain/models/post/post.model';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectPost } from '../../../../core/store/selectors/post.selectors';
import { deletePostSuccess, loadPost } from '../../../../core/store/actions/post.actions';
import { PostState } from '../../../../core/store/reducers/post.reducers';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ModalPostComponent } from '../modal-post/modal-post.component';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule, MatIconModule, MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {

  dataPost: Array<Post> = [];
  postList$: Observable<Array<Post>>;

  displayedColumns: string[] = [/*'userId',*/ 'id', 'title', 'body', 'actions'];
  dataSource!: MatTableDataSource<Post>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private store: Store<PostState>,
    public dialog: MatDialog,
  ) {
    this.postList$ = this.store.pipe(select(selectPost));
    this.getPost();
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getPost(): void {
    this.store.dispatch(loadPost());
    this.postList$.subscribe({
      next: (resp: Array<Post>) => {
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

  openDialog(post?: Post): void {
    this.dialog.open(ModalPostComponent, {
      data : post ? post : null,
      width: '500px',
      disableClose: true,
    });
  }

  deletePost(id: number): void {
    Swal.fire({
      title: "Delete post id: " + id + " ? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it !",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(deletePostSuccess({ payload: id }));
        Swal.fire({
          title: "Deleted!",
          text: "post has been deleted",
          icon: "success"
        });
      }
    });
  }

}
