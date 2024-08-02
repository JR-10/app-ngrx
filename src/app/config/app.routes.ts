import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () => import('../UI/pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'post',
    loadComponent: () => import('../UI/pages/post/list-post/post.component').then(m => m.PostComponent)
  },

  {
    path: 'photos',
    loadComponent: () => import('../UI/pages/photos/list-photos/photos.component').then(m => m.PhotosComponent)
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  }

];
