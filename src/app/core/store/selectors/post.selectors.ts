import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from '../reducers/post.reducers';

export const selectPostFeature = createFeatureSelector<PostState>('post');


export const selectPost = createSelector(
  selectPostFeature,
  (state: PostState) => state.data
);

export const selectPostError = createSelector(
  selectPostFeature,
  (state: PostState) => state.error
);




