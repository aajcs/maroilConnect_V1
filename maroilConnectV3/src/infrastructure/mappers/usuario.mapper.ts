import {Usuario} from '../../domain/entities/usuario';

import {UsuarioInterface} from '../interfaces/usuarioInterface';

export class UsuarioMapper {
  static usuarioToEntity(usuario: UsuarioInterface): Usuario {
    return {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      user: usuario.user,
      password: usuario.password,
      roles: usuario.roles,
      apps: usuario.apps,
      usuariocreado: usuario.usuariocreado,
      usuariomodificado: usuario.usuariomodificado,
      createdAt: usuario.createdAt,
      updatedAt: usuario.updatedAt,
      chatMaroilConnect: usuario.chatMaroilConnect,
      rolesMaroilConnect: usuario.rolesMaroilConnect,
      departamento: usuario.departamento,
      avatarUser: usuario.avatarUser,
      avatarUnicoUser: usuario.avatarUnicoUser,
    };
  }
}
