import {maroilApi} from '../../config/api/maroilApi';
import {FaidUser} from '../../domain/entities/user';
import {UsuarioInterface} from '../../infrastructure/interfaces/usuarioInterface';
import {UsuarioMapper} from '../../infrastructure/mappers/usuario.mapper';

export const getUsersActions = async () => {
  try {
    const {data} = await maroilApi.get<UsuarioInterface[]>('/usuario');

    const usuarios = data.map(usuario =>
      UsuarioMapper.usuarioToEntity(usuario),
    );

    return usuarios;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getUsersBuscarChatActions = async (user: FaidUser) => {
  try {
    const {data} = await maroilApi.get<UsuarioInterface[]>('/usuario');

    const usuarios = data.map(usuario =>
      UsuarioMapper.usuarioToEntity(usuario),
    );

    if (user.rolesMaroilConnect.some(role => role === 'NotRol')) {
      const usuariosFiltrados = usuarios.filter(
        usuario => usuario.correo === 'SUPERADMIN@MAROIL.COM.VE',
      );
      return usuariosFiltrados;
    }

    const usuariosFiltrados = usuarios.filter(
      usuario => usuario.chatMaroilConnect === true,
    );

    return usuariosFiltrados;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getUserAdministracionActions = async (user: FaidUser) => {
  try {
    const {data} = await maroilApi.get<UsuarioInterface[]>('/usuario');

    const usuarios = data.map(usuario =>
      UsuarioMapper.usuarioToEntity(usuario),
    );

    const usuariosFiltrados = usuarios.filter(
      usuario =>
        usuario.chatMaroilConnect != null && usuario.rolesMaroilConnect != null,
    );

    return usuariosFiltrados;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserActions = async userId => {
  try {
    const {data} = await maroilApi.get<UsuarioInterface[]>(
      `/usuario/${userId}`,
    );

    const usuario = UsuarioMapper.usuarioToEntity(data);

    return usuario;
  } catch (error) {
    console.log(error);
    return null;
  }
};
