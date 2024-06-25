import {chatMenssage} from '../../domain/entities/chatMenssage';
import {ChatsMessageInterface} from '../interfaces/chatMessageInterface';

export class ChatMessageMapper {
  static chatToEntity(chat: ChatsMessageInterface): chatMenssage {
    return {
      chatIdChatMessage: chat.chatIdChatMessage,
      userChatMessage: chat.userChatMessage,
      messageChatMessage: chat.messageChatMessage,
      statusChatMessage: chat.statusChatMessage,
      typeChatMessage: chat.typeChatMessage,
      createdAt: chat.createdAt,
      updatedAt: chat.updatedAt,
      id: chat.id,
    };
  }
}
