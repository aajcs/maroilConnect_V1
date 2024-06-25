import {maroilApi} from '../../config/api/maroilApi';
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
