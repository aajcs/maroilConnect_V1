import {maroilApi} from '../../config/api/maroilApi';
import {FaidUser} from '../../domain/entities/user';
import type {LoginResponse} from '../../infrastructure/interfaces/authInterface';

const returnUserToken = (data: LoginResponse) => {
  const user: FaidUser = {
    nombre: data.faidUser.nombre,
    correo: data.faidUser.correo,
    user: data.faidUser.user,
    password: data.faidUser.password,
    roles: data.faidUser.roles,
    apps: data.faidUser.apps,
    usuariocreado: data.faidUser.usuariocreado,
    usuariomodificado: data.faidUser.usuariomodificado,
    createdAt: data.faidUser.createdAt,
    updatedAt: data.faidUser.updatedAt,
    id: data.faidUser.id,
  };

  return {
    user: user,
    token: data.token,
  };
};

export const authLogin = async (email: string, password: string) => {
  email = email.toLowerCase();
  const user = email;

  try {
    const {data} = await maroilApi.post<LoginResponse>('/usuario/login', {
      user,
      password,
    });

    return returnUserToken(data);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const authCheckStatus = async () => {
  try {
    const {data} = await maroilApi.get<LoginResponse>('/usuario/login');
    return returnUserToken(data);
  } catch (error) {
    console.log({error});
    return null;
  }
};
