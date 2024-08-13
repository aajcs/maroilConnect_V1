import {Text, View} from 'react-native';
import {CabeceraChat} from '../components/chat/CabeceraChat';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {getChatMessageAllActions} from '../../actions/chat/getChatMessageAllActions';
import {FullScreenLoader} from '../components/iu/FullScreenLoader';
import {useCallback, useEffect, useState} from 'react';
import {UnreadMessages} from '../../actions/chat/UnreadMessagesActions';
import {Layout} from '@ui-kitten/components';
import {ChatMessageList} from '../components/chat/ChatMessageList';
import {ChatMessageForm} from '../components/chat/ChatMessageForm';
import {socket} from '../utils/sockets';
import AsyncStorage from '@react-native-async-storage/async-storage';

const unreadMessagesController = new UnreadMessages();

export const ChatScreen = () => {
  const queryClient = useQueryClient();

  const {
    params: {chat},
  } = useRoute();
  // const [messages, setMessages] = useState(null);
  console.log('chat', chat);

  const {isLoading, data: chatMessageData} = useQuery({
    queryKey: ['chatMessage', chat._id],
    staleTime: 1000 * 60 * 5,

    queryFn: async () => {
      const chatData = await getChatMessageAllActions(chat);
      await unreadMessagesController.setTotalReadMessages(
        chat._id,
        chatData?.totalChatsMessages,
      );
      return chatData;
    },
  });

  // const {isLoading, data: chats} = useQuery({
  //   queryKey: ['chats', 'infinite'],
  //   queryFn: async () => {
  //     const chatsData = await getChatsActions();
  //     return chatsData.sort(
  //       (a, b) => new Date(b.lastMessageDate) - new Date(a.lastMessageDate),
  //     );
  //   },
  // });
  useFocusEffect(
    useCallback(() => {
      const handleFocusEffect = async () => {
        queryClient.invalidateQueries({queryKey: ['chatMessage', chat._id]});
        await AsyncStorage.removeItem('ACTIVE_CHAT_ID');
      };
      handleFocusEffect();
    }, [queryClient, chat._id]),
  );
  useEffect(() => {
    socket?.emit('subscribe', chat._id);
    socket?.on('newMessage', message => {
      queryClient.invalidateQueries({queryKey: ['chatMessage', chat._id]});
    });
    return () => {
      socket?.emit('unsubscribe', chat._id);
      socket?.off('newMessage');
    };
  }, [queryClient, chat._id]);

  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem('ACTIVE_CHAT_ID', chat._id);
    })();
    return () => {
      (async () => {
        await AsyncStorage.removeItem('ACTIVE_CHAT_ID');
      })();
    };
  }, [chat]);
  return (
    <>
      <CabeceraChat chat={{chat}} />
      {isLoading && chatMessageData === undefined ? (
        <FullScreenLoader />
      ) : (
        <Layout style={{flex: 1}}>
          <ChatMessageList
            chatMenssages={chatMessageData}
            upTopChat={() => {}}
          />
          <Layout style={{height: 100}} />
          <ChatMessageForm chat={chat} />
        </Layout>
      )}
    </>
  );
};
