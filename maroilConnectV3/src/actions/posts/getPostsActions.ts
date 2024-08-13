import {maroilApi} from '../../config/api/maroilApi';
import {PostInterface} from '../../infrastructure/interfaces/postInterface';
import {PostMapper} from '../../infrastructure/mappers/post.mapper';

export const getPosts = async () => {
  try {
    const {data} = await maroilApi.get<PostInterface[]>('/post');

    const posts = data
      .filter(post => post.estatusPost === 'Aprobados')
      .map(post => PostMapper.postToEntity(post));

    return posts;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getPostsAprobados = async (offset = 0) => {
  try {
    const {data} = await maroilApi.get<PostInterface[]>('/post/aprobados', {
      params: {
        desde: offset * 10,
        limite: 10,
      },
    });

    const posts = data.map(post => PostMapper.postToEntity(post));

    return posts;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getPostsUser = async userId => {
  try {
    const {data} = await maroilApi.get<PostInterface[]>(`/post/user/${userId}`);

    const posts = data.map(post => PostMapper.postToEntity(post));

    return posts;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getPostsBorrador = async (offset = 0) => {
  try {
    const {data} = await maroilApi.get<PostInterface[]>('/post/borrador', {
      params: {
        desde: offset * 10,
        limite: 10,
      },
    });

    const postsBorrador = data.map(PostMapper.postToEntity);

    return postsBorrador;
  } catch (error) {
    console.log(error);
    return null;
  }
};
