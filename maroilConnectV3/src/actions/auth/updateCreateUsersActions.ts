import {maroilApi} from '../../config/api/maroilApi';

import {Usuario} from '../../domain/entities/usuario';

export const updateCreateUsersActions = (usuario: Partial<Usuario>) => {
  if (usuario.id && usuario.id !== 'new') {
    return updateUser(usuario);
  }
  return createUser(usuario);
};
export const updateAvatarUsersActions = async ({
  id,
  avatarUser,
  avatarUnicoUser,
}: Partial<Usuario>) => {
  const formData = new FormData();

  // Agrega los demás campos al formData
  if (avatarUnicoUser && avatarUnicoUser.trim() !== '') {
    const extension = avatarUnicoUser.split('.').pop();
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
    formData.append('avatarUnicoUser', {
      uri: avatarUnicoUser,
      type: mimeType,
      name: avatarUnicoUser,
    });
  }

  // // Agrega las imágenes al formData
  // if (avatarUser) {
  //   avatarUser.forEach(media => {
  //     if (media.url && media.url.trim() !== '') {
  //       const extension = media.url.split('.').pop();
  //       let mimeType;

  //       // Ajusta el tipo MIME según la extensión del archivo
  //       switch (extension) {
  //         case 'jpg':
  //         case 'jpeg':
  //         case 'png':
  //         case 'gif':
  //           mimeType = `image/${extension}`;
  //           break;
  //         case 'mp4':
  //         case 'webm':
  //         case 'ogg':
  //           mimeType = `video/${extension}`;
  //           break;
  //         default:
  //           console.error(`Unsupported file type: ${extension}`);
  //           return;
  //       }

  //       formData.append('avatarUser', {
  //         uri: media.url,
  //         type: mimeType,
  //         name: media.url,
  //       });
  //     }
  //   });
  // }

  try {
    const {data} = await maroilApi.put(`/usuario/${id}`, formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  } catch (error) {
    console.log('error', error);
    console.error(error);
  }
};

const updateUser = async (usuario: Partial<Usuario>) => {
  const id = usuario.id as string;
  try {
    const {data} = await maroilApi.put(`/usuario/${id}`, usuario);

    return data;
  } catch (error) {
    console.error(error);
  }
};

const createUser = async (usuario: Partial<Usuario>) => {
  try {
    // const {data} = await maroilApi.post('/post/', );
    const {data} = await maroilApi.post('/usuario/', {
      ...usuario,
      user: usuario.correo,
      chatMaroilConnect: false,
      rolesMaroilConnect: ['NotRol'],
    });

    return data.saveUsuario;
  } catch (error) {
    // console.error('este error', error);
    if ((error as any).response) {
      // console.error('Respuesta del servidor:', (error as any).response.data);
      return (error as any).response.data;
    }
  }
};
