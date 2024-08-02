import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PostGateway } from '../domain/models/post/gateways/post.gateway';
import { PostAdapterService } from '../infrastructure/driven-adapter/post-adapter/post-adapter.service';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideState, provideStore } from '@ngrx/store';
import { postReducer } from '../core/store/reducers/post.reducers';
import { photosReducer } from '../core/store/reducers/photos.reducers';
import { provideEffects } from '@ngrx/effects';
import { PostEffects } from '../core/store/effects/post.effects';
import { PhotosEffects } from '../core/store/effects/photos.effects';
import { PhotosAdapterService } from '../infrastructure/driven-adapter/photos-adapter/photos-adapter.service';
import { PhotosGateway } from '../domain/models/photos/gateways/photos.gateway';



export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideAnimationsAsync(),
    { provide: PostGateway, useClass: PostAdapterService },
    { provide: PhotosGateway, useClass: PhotosAdapterService },
    provideStore(),
    provideState({name: 'post', reducer: postReducer}),
    provideState({name: 'photos', reducer: photosReducer}),
    provideEffects([PostEffects, PhotosEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode(), trace: true }),
  ],
};
