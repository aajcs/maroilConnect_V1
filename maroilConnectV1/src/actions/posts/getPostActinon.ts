import {maroilApi} from '../../config/api/maroilApi';
import {Post} from '../../domain/entities/post';
import {PostInterface} from '../../infrastructure/interfaces/postInterface';
import {PostMapper} from '../../infrastructure/mappers/post.mapper';

const emptyPost: Post = {
  id: '',
  titlePost: 'nuevo post',
  contentPost: '',
  authorPost: {nombre: '', correo: '', id: ''},
  mediaPost: [{public_id: '', url: ''}],
};

export const getPost = async (id: string): Promise<Post> => {
  if (id === 'new') {
    return emptyPost;
  }
  try {
    const {data} = await maroilApi.get<PostInterface>(`/post/${id}`);

    return PostMapper.postToEntity(data);
  } catch (error) {
    console.log(error);
    throw new Error('Error getting post');
  }
};
