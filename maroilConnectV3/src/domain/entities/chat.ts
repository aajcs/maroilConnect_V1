export interface Chat {
  _id?: string;
  participanteOne: Participante | string;
  participanteTwo: Participante | string;
  createdAt?: Date;
  updatedAt?: Date;
  lastMessageDate?: Date;
}

export interface Participante {
  nombre: string;
  correo: string;
  id: string;
}
