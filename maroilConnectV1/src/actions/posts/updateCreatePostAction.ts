import {maroilApi} from '../../config/api/maroilApi';
import {Post} from '../../domain/entities/post';

export const updateCreatePostAction = (post: Partial<Post>) => {
  if (post.id && post.id !== 'new') {
    return updatePost(post);
  }
  return createPost(post);
};

const updatePost = async (post: Partial<Post>) => {
  const {id, authorPost, ...rest} = post;

  try {
    const {data} = await maroilApi.put(`/post/${id}`, rest);

    return data;
  } catch (error) {
    console.error(error);
  }
};
const createPost = async (post: Partial<Post>) => {
  const {authorPost, mediaPost, ...rest} = post;
  console.log('mediaPost', mediaPost);

  try {
    const formData = new FormData();

    // Agrega los demás campos al formData
    for (const key in rest) {
      formData.append(key, rest[key as keyof typeof rest]);
    }

    // Agrega las imágenes al formData
    if (mediaPost) {
      mediaPost.forEach(media => {
        if (media.url && media.url.trim() !== '') {
          formData.append('mediaPost', {
            uri: media.url,
            // type: media,
            name: media.url,
          });
        }
      });
    }
    console.log('formData', formData);

    const {data} = await maroilApi.post('/post/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('data', data);

    return data;
  } catch (error) {
    console.error(error);
  }
};
