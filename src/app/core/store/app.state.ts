import { PhotosState } from "./reducers/photos.reducers";
import { PostState } from "./reducers/post.reducers";

export interface AppState {
  post: PostState;
  pothos: PhotosState;
}
