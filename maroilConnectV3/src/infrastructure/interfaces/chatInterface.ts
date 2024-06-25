export interface ChatInterface {
  _id: string;
  participanteOne: Participante;
  participanteTwo: Participante;
  createdAt: Date;
  updatedAt: Date;
  lastMessageDate: Date;
}

export interface Participante {
  nombre: string;
  correo: string;
  id: string;
}
