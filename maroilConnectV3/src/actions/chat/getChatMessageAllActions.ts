import {maroilApi} from '../../config/api/maroilApi';
import {chatMenssage} from '../../domain/entities/chatMenssage';
import {ChatsMessageInterface} from '../../infrastructure/interfaces/chatMessageInterface';
import {ChatMessageMapper} from '../../infrastructure/mappers/chatMessage.mapper';

export const getChatMessageAllActions = async (
  chatMenssage: Partial<chatMenssage>,
) => {
  try {
    const {_id} = chatMenssage;

    const {data} = await maroilApi.get<ChatsMessageInterface[]>(
      `/chatmessage/${_id}`,
    );
    // const {chatsMessages} = data;

    // const chatMenssageLast = chatsMessages.map(p =>
    //   ChatMessageMapper.chatToEntity(p),
    // );
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
