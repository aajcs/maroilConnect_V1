import {maroilApi} from '../../config/api/maroilApi';
import {Post} from '../../domain/entities/post';

export const updateCreateLikeAction = (post: Partial<Post>) => {
  if (post.id && post.id !== 'new') {
    return createLike(post);
  }
  return updateLike(post);
};

const updateLike = async (post: Partial<Post>) => {
  const {id, authorPost, ...rest} = post;

  try {
    const {data} = await maroilApi.put(`/post/${id}`, rest);

    return data;
  } catch (error) {
    console.error(error);
  }
};
const createLike = async (post: Partial<Post>) => {
  const {id} = post;

  try {
    const postLike = id;

    const {data} = await maroilApi.post('/like/', {postLike});

    return data;
  } catch (error) {
    console.error(error);
  }
};
