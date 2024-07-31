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
import { provideEffects } from '@ngrx/effects';
import { PostEffects } from '../core/store/effects/post.effects';



export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideAnimationsAsync(),
    { provide: PostGateway, useClass: PostAdapterService },
    provideStore(),
    provideState({name: 'post', reducer: postReducer}),
    provideEffects(PostEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode(), trace: true }),
  ],
};
