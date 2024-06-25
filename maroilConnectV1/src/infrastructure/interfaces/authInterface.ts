import {FaidUser} from '../../domain/entities/user';

export interface LoginData {
  user: string;
  password: string;
}
export interface RegisterData {
  nombre: string;
  correo: string;
  user: string;
  password: string;
}

export interface LoginResponse {
  faidUser: FaidUser;
  token: string;
  message: string;
}
