import {maroilApi} from '../../config/api/maroilApi';
import {PostInterface} from '../../infrastructure/interfaces/postInterface';
import {PostMapper} from '../../infrastructure/mappers/post.mapper';

export const getPosts = async () => {
  try {
    const {data} = await maroilApi.get<PostInterface[]>('/post');

    const posts = data.map(post => PostMapper.postToEntity(post));

    return posts;
  } catch (error) {
    console.log(error);
    return null;
  }
};
