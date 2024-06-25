export interface UsuarioInterface {
  nombre: string;
  correo: string;
  user: string;
  password: string;
  roles: string[];
  apps: string[];
  usuariocreado: Date;
  usuariomodificado: Date;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  chatMaroilConnect?: boolean;
}
