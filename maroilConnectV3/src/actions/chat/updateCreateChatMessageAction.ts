import {maroilApi} from '../../config/api/maroilApi';
import {chatMenssage} from '../../domain/entities/chatMenssage';

export const updateCreateChatMessageAction = (
  chatMenssage: Partial<chatMenssage>,
) => {
  if (chatMenssage.chatId && chatMenssage.chatId === 'new') {
    return updateChat(chatMenssage);
  }
  return createChat(chatMenssage);
};

const updateChat = async (chatMenssage: Partial<chatMenssage>) => {
  const {id, authorChat, ...rest} = chatMenssage;

  try {
    const {data} = await maroilApi.put(`/chatMenssage/${id}`, rest);

    return data;
  } catch (error) {
    console.error(error);
  }
};

const createChat = async (chatMenssage: Partial<chatMenssage>) => {
  // const {authorChat, mediaChat, ...rest} = chat;
  chatMenssageSend = {
    chatIdChatMessage: chatMenssage.chatId,
    messageChatMessage: chatMenssage.message,
  };
  try {
    const {data} = await maroilApi.post('/chatmessage', chatMenssageSend);

    return data;
  } catch (error) {
    console.error(error);
  }
};
