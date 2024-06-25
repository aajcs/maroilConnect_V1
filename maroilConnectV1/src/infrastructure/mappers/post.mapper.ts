import {Post} from '../../domain/entities/post';
import {PostInterface} from '../interfaces/postInterface';

export class PostMapper {
  static postToEntity(post: PostInterface): Post {
    return {
      id: post.id,
      authorPost: post.authorPost,
      titlePost: post.titlePost,
      contentPost: post.contentPost,
      commentsPost: post.commentsPost,
      likesPost: post.likesPost,
      viewsPost: post.viewsPost,
      mediaPost: post.mediaPost,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  }
}
