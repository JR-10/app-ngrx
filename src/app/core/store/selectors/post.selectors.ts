import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from '../reducers/post.reducers';

export const selectPostFeature = createFeatureSelector<PostState>('post');


export const getPostList = createSelector(selectPostFeature, (state: PostState) => {
  return state.data;
})

export const getPostEdit = createSelector(selectPostFeature, (state: PostState) => {
  return state.editdata;
})
