import {maroilApi} from '../../config/api/maroilApi';
import {chatMenssage} from '../../domain/entities/chatMenssage';
import {ChatsMessageInterface} from '../../infrastructure/interfaces/chatMessageInterface';

export const getChatMessageTotalsActions = async (
  chatMenssage: Partial<chatMenssage>,
) => {
  try {
    const {id} = chatMenssage;
    const {data} = await maroilApi.get<ChatsMessageInterface>(
      `/chatmessage/total/${id}`,
    );

    const chatMenssageTotal = data;
    return chatMenssageTotal;
  } catch (error) {
    console.error(error);
    return null;
  }
};
