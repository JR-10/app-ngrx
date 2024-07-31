import { Routes } from '@angular/router';
import { HomeComponent } from '../UI/pages/home/home.component';
import { PostComponent } from '../UI/pages/post/post.component';
import { PhotosComponent } from '../UI/pages/photos/photos.component';

export const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'post', component: PostComponent },
  { path: 'photos', component: PhotosComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }

];
