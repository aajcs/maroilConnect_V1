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

  console.log('rest', rest);

  try {
    const formData = new FormData();

    // Agrega los demás campos al formData
    for (const key in rest) {
      let value = rest[key as keyof typeof rest];
      if (value instanceof Date) {
        value = value.toISOString(); // Convertir fecha a formato ISO
      }
      formData.append(key, value);
    }

    // Agrega las imágenes al formData
    if (mediaPost) {
      mediaPost.forEach(media => {
        if (media.url && media.url.trim() !== '') {
          const extension = media.url.split('.').pop();
          let mimeType;

          // Ajusta el tipo MIME según la extensión del archivo
          switch (extension) {
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
              mimeType = `image/${extension}`;
              break;
            case 'mp4':
            case 'webm':
            case 'ogg':
              mimeType = `video/${extension}`;
              break;
            default:
              console.error(`Unsupported file type: ${extension}`);
              return;
          }

          formData.append('mediaPost', {
            uri: media.url,
            type: mimeType,
            name: media.url,
          });
        }
      });
    }

    const {data} = await maroilApi.post('/post/', formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};
// const prepareImages = (mediaPosts: {url: string}[]) => {
//   return mediaPosts
//     .map(media => {
//       if (media.url && media.url.trim() !== '') {
//         return {
//           uri: media.url,
//           name: media.url,
//         };
//       }
//     })
//     .filter(Boolean); // Esto eliminará cualquier elemento undefined del array
// };
// const createPost = async (post: Partial<Post>) => {
//   const {authorPost, mediaPost = [], ...rest} = post;

//   try {
//     const checkedMediaPosts = prepareImages(mediaPost); // Asegúrate de tener una función prepareImages que maneje tus objetos mediaPost
//     console.log('checkedMediaPosts', checkedMediaPosts);

//     const {data} = await maroilApi.post('/post/', {
//       mediaPost: checkedMediaPosts,
//       ...rest,
//     });

//     return data;
//   } catch (error) {
//     console.error(error);
//   }
//   //   if (isAxiosError(error)) {
//   //     console.log(error.response?.data);
//   //   }

//   //   throw new Error('Error al crear el post');
//   // }
// };
