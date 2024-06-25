import {maroilApi} from '../../config/api/maroilApi';
import {Post} from '../../domain/entities/post';

export const updateCreateViewAction = (post: Partial<Post>) => {
  if (post.id && post.id !== 'new') {
    return createView(post);
  }
  return updateView(post);
};

const updateView = async (post: Partial<Post>) => {
  const {id, authorPost, ...rest} = post;

  try {
    const {data} = await maroilApi.put(`/post/${id}`, rest);

    return data;
  } catch (error) {
    console.error(error);
  }
};
const createView = async (post: Partial<Post>) => {
  const {id} = post;

  try {
    const postView = id;

    const {data} = await maroilApi.post('/View/', {postView});

    return data;
  } catch (error) {
    console.error(error);
  }
};
