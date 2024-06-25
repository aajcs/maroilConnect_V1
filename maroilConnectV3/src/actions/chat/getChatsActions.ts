import {maroilApi} from '../../config/api/maroilApi';
import {ChatInterface} from '../../infrastructure/interfaces/chatInterface';
import {ChatMapper} from '../../infrastructure/mappers/chat.mapper';

export const getChatsActions = async () => {
  try {
    const {data} = await maroilApi.get<ChatInterface[]>('/chat');

    const chats = data.map(chat => ChatMapper.chatToEntity(chat));

    return chats;
  } catch (error) {
    console.log(error);
    return null;
  }
};
