import { Post } from "./post.model";

export interface PostDTO extends Omit<Post, 'id'> {}
