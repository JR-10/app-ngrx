import { Component, OnInit } from '@angular/core';
import { PostState } from '../../../core/store/reducers/post.reducers';
import { select, Store } from '@ngrx/store';
import { Photos } from '../../../domain/models/photos/photos.model';
import { Observable } from 'rxjs';
import { loadPhotos } from '../../../core/store/actions/photos.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { selectPhotos } from '../../../core/store/selectors/photos.selectors';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss'
})
export class PhotosComponent implements OnInit {


  dataPhotos: Array<Photos> = [];
  photosList$: Observable<Array<Photos>>;

  constructor(
    private store: Store<PostState>,
  ) {
    this.photosList$ = this.store.pipe(select(selectPhotos));
  }

  ngOnInit(): void {
    this.getPhotosNgRx();
  }

  getPhotosNgRx(): void {
    this.store.dispatch(loadPhotos());
    this.photosList$.subscribe({
      next: (resp: Array<Photos>) => {
        console.log('Valor de Photos NgRx', resp);
        this.dataPhotos = resp;
      },
      error: (_error: HttpErrorResponse) => {
      },
    });
  }
}
