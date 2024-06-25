import {maroilApi} from '../../config/api/maroilApi';
import {UsuarioInterface} from '../../infrastructure/interfaces/usuarioInterface';
import {UsuarioMapper} from '../../infrastructure/mappers/usuario.mapper';
import {Usuario} from '../../domain/entities/usuario';

export const updateCreateUsersActions = (usuario: Partial<Usuario>) => {
  if (usuario.id && usuario.id !== 'new') {
    return updateUser(usuario);
  }
  return createUser(usuario);
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

    console.log('data', data.saveUsuario);
    return data.saveUsuario;
  } catch (error) {
    // console.error('este error', error);
    if ((error as any).response) {
      // console.error('Respuesta del servidor:', (error as any).response.data);
      return (error as any).response.data;
    }
  }
};
