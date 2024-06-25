import {maroilApi} from '../../config/api/maroilApi';
import {chatMenssage} from '../../domain/entities/chatMenssage';
import {ChatsMessageInterface} from '../../infrastructure/interfaces/chatMessageInterface';
import {ChatMessageMapper} from '../../infrastructure/mappers/chatMessage.mapper';

export const getChatMessageLastsActions = async (
  chatMenssage: Partial<chatMenssage>,
) => {
  try {
    const {id} = chatMenssage;
    const {data} = await maroilApi.get<ChatsMessageInterface>(
      `/chatmessage/last/${id}`,
    );

    const chatMenssageLast = ChatMessageMapper.chatToEntity(data);
    return chatMenssageLast;
  } catch (error) {
    console.error(error);
    return null;
  }
};
