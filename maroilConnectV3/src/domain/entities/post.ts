export interface Post {
  authorPost: AuthorPost;
  titlePost: string;
  contentPost: string;
  commentsPost?: any[];
  likesPost?: LikesPost[];
  viewsPost?: any[];
  mediaPost?: mediaPost[];
  createdAt?: Date;
  updatedAt?: Date;
  id: string;
}

export interface AuthorPost {
  nombre: string;
  correo: string;
  id: string;
}

export interface mediaPost {
  public_id: String;
  url: String;
}

export interface LikesPost {
  authorLike: AuthorLike;
  postLike: string;
}

export interface AuthorLike {
  nombre: string;
  id: string;
}
