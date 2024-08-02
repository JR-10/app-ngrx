import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { select, Store } from '@ngrx/store';
import { PostState } from '../../../../core/store/reducers/post.reducers';
import { createPostSuccess, getPostByIdSuccess, loadPost, updatePostSuccess } from '../../../../core/store/actions/post.actions';
import { Post } from '../../../../domain/models/post/post.model';
import { getPostEdit, getPostList } from '../../../../core/store/selectors/post.selectors';
import { HttpErrorResponse } from '@angular/common/http';
import { HelperService } from '../../../shared/helpers/helper.service';

@Component({
  selector: 'app-modal-post',
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
  templateUrl: './modal-post.component.html',
  styleUrl: './modal-post.component.scss'
})
export class ModalPostComponent implements OnInit {

  titleModal = 'Create Post';
  idPost!: number;
  formPost!: FormGroup;
  dataPost: Array<Post> = [];
  bodySavePost!: Post;


  constructor(
    private store: Store<PostState>,
    private fb: FormBuilder,
    private  helpers: HelperService,
    public dialogRef: MatDialogRef<ModalPostComponent>,
    @Inject(MAT_DIALOG_DATA) public dataPostModal: Post,
  ) {
    this.idPost = this.dataPostModal?.id;
    this.loadForm();
  }

  ngOnInit(): void {
    this.getPostById();
  }

  loadForm(): void {
    this.formPost = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }


  getPostById(): void {
    if (this.idPost != null || this.idPost != undefined) {
      this.titleModal = 'Edit Post';
      this.store.dispatch(getPostByIdSuccess({payload: this.dataPostModal}));
      this.store.pipe(select(getPostEdit)).subscribe({
        next: (resp: Post) => {
          this.formPost?.setValue({ title: resp.title, body: resp.body });
        },
        error: (_error: HttpErrorResponse) => {
          this.helpers.toast({ icon: 'error', text: _error.message });
        },
      });
    }
  }

  getPost(): void {
    this.store.dispatch(loadPost());
    this.store.pipe(select(getPostList)).subscribe({
      next: (resp: Array<Post>) => {
        this.dataPost = resp;
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
    if(this.formPost.valid) {
      this.getPost();


      if(this.idPost != null || this.idPost != undefined) {
        this.bodySavePost = {
          userId: this.dataPostModal.userId,
          id: this.dataPostModal.id,
          title: this.formPost.value.title,
          body: this.formPost.value.body
        };
        this.store.dispatch(updatePostSuccess({payload: this.bodySavePost}));
      } else {
        const lastPost = this.dataPost[this.dataPost.length - 1];
        this.bodySavePost = {
          userId: this.getRandom(10),
          id: lastPost.id + 1,
          title: this.formPost.value.title,
          body: this.formPost.value.body
        };
        this.store.dispatch(createPostSuccess({payload: this.bodySavePost}));
      }
      this.onClose();
      this.helpers.toast({ icon: 'success', text: 'Post saved successfully' });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
