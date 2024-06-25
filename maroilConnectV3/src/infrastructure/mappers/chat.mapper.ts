import {Chat} from '../../domain/entities/chat';
import {ChatInterface} from '../interfaces/chatInterface';

export class ChatMapper {
  static chatToEntity(chat: ChatInterface): Chat {
    return {
      _id: chat._id,
      participanteOne: chat.participanteOne,
      participanteTwo: chat.participanteTwo,
      createdAt: chat.createdAt,
      updatedAt: chat.updatedAt,
      lastMessageDate: chat.lastMessageDate,
    };
  }
}
