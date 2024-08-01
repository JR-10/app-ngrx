import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { select, Store } from '@ngrx/store';
import { PostState } from '../../../../core/store/reducers/post.reducers';
import { createPost, createPostSuccess, loadPost } from '../../../../core/store/actions/post.actions';
import { Post } from '../../../../domain/models/post/post.model';
import { selectPost } from '../../../../core/store/selectors/post.selectors';
import { HttpErrorResponse } from '@angular/common/http';

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
export class ModalPostComponent {

  titleModal = 'Create Post';
  idPost!: number;
  formCreatePost!: FormGroup;
  dataPost: Array<Post> = [];


  constructor(
    private store: Store<PostState>,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalPostComponent>,
    @Inject(MAT_DIALOG_DATA) public dataPostModal: Post,
  ) {
    this.idPost = this.dataPostModal?.id;
    if (this.idPost != null && this.idPost != undefined) {
      this.titleModal = 'Edit Post';
    }
    this.loadForm();
  }

  loadForm(): void {
    this.formCreatePost = this.fb.group({
      title: ['', [Validators.required]],
      body: ['', Validators.required],
    });
  }

  getPost(): void {
    this.store.dispatch(loadPost());
    this.store.pipe(select(selectPost)).subscribe({
      next: (resp: Array<Post>) => {
        this.dataPost = resp;
      },
      error: (_error: HttpErrorResponse) => {
      },
    });
  }


  getRandom(max: number) {
    var num = Math.ceil(Math.random()*max);
    return num;
  }

  onSubmit(): void {
    if(this.formCreatePost.valid) {
      this.getPost();
      console.log('@@@@ valor formulario: ', this.formCreatePost.value);
      const lastPost = this.dataPost[this.dataPost.length - 1];
      let bodyCreatePost: Post = {
        userId: this.getRandom(10),
        id: lastPost.id + 1,
        title: this.formCreatePost.value.title,
        body: this.formCreatePost.value.body
      };
      console.log('Valor Body Create: ', bodyCreatePost);
      this.store.dispatch(createPostSuccess({payload: bodyCreatePost}));
      this.onClose();
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
