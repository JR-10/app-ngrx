import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Photos } from '../../../../domain/models/photos/photos.model';
import { PhotosState } from '../../../../core/store/reducers/photos.reducers';
import { select, Store } from '@ngrx/store';
import { HelperService } from '../../../shared/helpers/helper.service';
import { HttpErrorResponse } from '@angular/common/http';
import { createPhotosSuccess, getPhotosByIdSuccess, loadPhotos } from '../../../../core/store/actions/photos.actions';
import { getPhotosEdit, getPhotosList } from '../../../../core/store/selectors/photos.selectors';


@Component({
  selector: 'app-modal-photos',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
  ],
  templateUrl: './modal-photos.component.html',
  styleUrl: './modal-photos.component.scss'
})
export class ModalPhotosComponent implements OnInit {

  titleModal = 'Create Photos';
  idPhotos!: number;
  formPhotos!: FormGroup;
  dataPhotos: Array<Photos> = [];
  bodySavePhotos!: Photos;

  constructor(
    private store: Store<PhotosState>,
    private fb: FormBuilder,
    private  helpers: HelperService,
    public dialogRef: MatDialogRef<ModalPhotosComponent>,
    @Inject(MAT_DIALOG_DATA) public dataPhotosModal: Photos,
  ) {
    this.idPhotos = this.dataPhotosModal?.id;
    this.loadFormPhotos();
  }

  ngOnInit(): void {
    this.getPothosById();
  }

  loadFormPhotos(): void {
    this.formPhotos = this.fb.group({
      title: ['', Validators.required],
      url: ['', Validators.required],
      thumbnailUrl: ['', Validators.required],
    });
  }

  getPothosById(): void {
    if (this.idPhotos != null || this.idPhotos != undefined) {
      this.titleModal = 'Edit Pothos';
      this.store.dispatch(getPhotosByIdSuccess({dataPhotos: this.dataPhotosModal}));
      this.store.pipe(select(getPhotosEdit)).subscribe({
        next: (resp: Photos) => {
          this.formPhotos?.setValue({ title: resp.title, url: resp.url, thumbnailUrl: resp.thumbnailUrl });
        },
        error: (_error: HttpErrorResponse) => {
          this.helpers.toast({ icon: 'error', text: _error.message });
        },
      });
    }
  }

  getPhotos(): void {
    this.store.dispatch(loadPhotos());
    this.store.pipe(select(getPhotosList)).subscribe({
      next: (resp: Array<Photos>) => {
        this.dataPhotos = resp;
      },
      error: (_error: HttpErrorResponse) => {
        this.helpers.toast({ icon: 'error', text: _error.message });
      },
    });
  }

  getRandom(max: number) {
    var num = Math.ceil(Math.random()*max);
    return num;
  }

  onSubmit(): void {
    if(this.formPhotos.valid) {
      this.getPhotos();


      if(this.idPhotos != null || this.idPhotos != undefined) {
        this.bodySavePhotos = {
          albumId: this.dataPhotosModal.albumId,
          id: this.dataPhotosModal.id,
          title: this.formPhotos.value.title,
          url: this.formPhotos.value.body,
          thumbnailUrl: this.formPhotos.value.body,
        };
        // this.store.dispatch(updatePhotosSuccess({payload: this.bodySavePhotos}));
      } else {
        const lastPhotos = this.dataPhotos[this.dataPhotos.length - 1];
        this.bodySavePhotos = {
          albumId: this.getRandom(100),
          id: lastPhotos.id + 1,
          title: this.formPhotos.value.title,
          url: this.formPhotos.value.url,
          thumbnailUrl: this.formPhotos.value.thumbnailUrl,
        };
        this.store.dispatch(createPhotosSuccess({dataPhotos: this.bodySavePhotos}));
      }
      this.onClose();
      this.helpers.toast({ icon: 'success', text: 'Post saved successfully' });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
