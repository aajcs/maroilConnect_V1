import {maroilApi} from '../../config/api/maroilApi';
import {Post} from '../../domain/entities/post';

export const updateCreateCommentAction = (
  post: Partial<Post>,
  text: string,
) => {
  if (post.id && post.id !== 'new') {
    return createComment(post, text);
  }
  return updateComment(post);
};

const updateComment = async (post: Partial<Post>) => {
  const {id, authorPost, ...rest} = post;

  try {
    const {data} = await maroilApi.put(`/post/${id}`, rest);

    return data;
  } catch (error) {
    console.error(error);
  }
};
const createComment = async (post: Partial<Post>, text: string) => {
  const {id} = post;

  try {
    const postComment = id;
    const contentComment = text;

    const {data} = await maroilApi.post('/Comment/', {
      postComment,
      contentComment,
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};
