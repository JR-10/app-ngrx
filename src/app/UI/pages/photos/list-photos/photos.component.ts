import { Component, OnInit, ViewChild } from '@angular/core';
import { PostState } from '../../../../core/store/reducers/post.reducers';
import { select, Store } from '@ngrx/store';
import { Photos } from '../../../../domain/models/photos/photos.model';
import { Observable } from 'rxjs';
import { loadPhotos } from '../../../../core/store/actions/photos.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HelperService } from '../../../shared/helpers/helper.service';
import { ModalPhotosComponent } from '../modal-photos/modal-photos.component';
import { MatDialog } from '@angular/material/dialog';
import { getPhotosList } from '../../../../core/store/selectors/photos.selectors';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss'
})
export class PhotosComponent implements OnInit {

  dataPhotos: Array<Photos> = [];
  photosList$: Observable<Array<Photos>>;

  displayedColumns: string[] = [/*'albumId',*/ 'id', 'title', 'url', 'thumbnailUrl', 'actions'];
  dataSource!: MatTableDataSource<Photos>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private store: Store<PostState>,
    private  helpers: HelperService,
    public dialog: MatDialog,
  ) {
    this.photosList$ = this.store.pipe(select(getPhotosList));
  }

  ngOnInit(): void {
    this.getPhotos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getPhotos(): void {
    this.store.dispatch(loadPhotos());
    this.photosList$.subscribe({
      next: (resp: Array<Photos>) => {
        this.dataPhotos = resp;
        this.dataSource = new MatTableDataSource(this.dataPhotos);
        this.dataSource.paginator = this.dataPhotos.length > 0 ? this.paginator : null;
      },
      error: (_error: HttpErrorResponse) => {
        this.helpers.toast({ icon: 'error', text: _error.error.message });
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

  openDialogPhotos(photos?: Photos): void {
    this.dialog.open(ModalPhotosComponent, {
      data : photos ? photos : null,
      width: '500px',
      disableClose: true,
    });
  }

  deletePhotos(row: any): void {
  }
}
