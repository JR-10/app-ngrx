import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () => import('../UI/pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'post',
    loadComponent: () => import('../UI/pages/post/post.component').then(m => m.PostComponent)
  },

  {
    path: 'photos',
    loadComponent: () => import('../UI/pages/photos/photos.component').then(m => m.PhotosComponent)
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }

];
