import {maroilApi} from '../../config/api/maroilApi';
import {Chat} from '../../domain/entities/chat';

export const updateCreateChatAction = (chat: Partial<Chat>) => {
  if (chat._id && chat._id !== 'new') {
    return updateChat(chat);
  }
  return createChat(chat);
};

const updateChat = async (chat: Partial<Chat>) => {
  const {id, authorChat, ...rest} = chat;

  try {
    const {data} = await maroilApi.put(`/chat/${id}`, rest);

    return data;
  } catch (error) {
    console.error(error);
  }
};

const createChat = async (chat: Partial<Chat>) => {
  // const {authorChat, mediaChat, ...rest} = chat;

  try {
    const {data} = await maroilApi.post('/chat/', chat, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};
