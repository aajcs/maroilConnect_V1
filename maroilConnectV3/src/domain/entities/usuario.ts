export interface Usuario {
  nombre: string;
  correo: string;
  departamento: string;
  user?: string;
  password: string;
  roles?: string[];
  apps?: string[];
  usuariocreado?: Date;
  usuariomodificado?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  id?: string;
  chatMaroilConnect?: boolean;
  rolesMaroilConnect?: string[];
  avatarUser?: avatarUser[];
  avatarUnicoUser?: string;
}
export interface avatarUser {
  public_id: String;
  url: String;
}
