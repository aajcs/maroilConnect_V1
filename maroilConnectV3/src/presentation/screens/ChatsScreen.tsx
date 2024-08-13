/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/self-closing-comp */
import {useEffect, useState, useCallback} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {MyIcon} from '../components/iu/MyIcon';
import {Button, Layout} from '@ui-kitten/components';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {getChatsActions} from '../../actions/chat/getChatsActions';
import {FullScreenLoader} from '../components/iu/FullScreenLoader';
import {BuscarChat} from '../components/chat/BuscarChat';
import {ChatList} from '../components/chat/ChatList';

export const ChatsScreen = () => {
  const queryClient = useQueryClient();
  const {isLoading, data: chats} = useQuery({
    queryKey: ['chats', 'infinite'],
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const chatsData = await getChatsActions();
      return chatsData.sort(
        (a, b) => new Date(b.lastMessageDate) - new Date(a.lastMessageDate),
      );
    },
  });
  // console.log('chats', JSON.stringify(chats, null, 2));
  const [chatsState, setChatsState] = useState(chats);
  const [chatBuscar, setChatBuscar] = useState([]);

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerleft: () => (
        <BuscarChat data={chatsState || []} setData={setChatBuscar} />
      ),
      headerRight: () => (
        <Button
          accessoryRight={<MyIcon name="plus-outline" white />}
          // style={{marginTop: 20}}
          onPress={() => {
            navigation.navigate('CreateChatScreen');
          }}></Button>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (chats) {
      setChatBuscar(chats);
    }
    setChatsState(chats);
  }, [chats]);

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries({queryKey: ['chats', 'infinite']});
    }, [queryClient]),
  );
  const upTopChat = chatId => {
    const data = chats;
    const formIndex = data.map(chat => chat._id).indexOf(chatId);
    const toIndex = 0;

    const element = data.splice(formIndex, 1)[0];

    data.splice(toIndex, 0, element);
    setChatsState([...data]);
  };
  return (
    <Layout>
      {isLoading ? (
        <FullScreenLoader />
      ) : (
        <>
          <Layout
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Layout style={{flex: 1}}>
              <BuscarChat data={chatsState || []} setData={setChatBuscar} />
            </Layout>
            <Button
              accessoryRight={<MyIcon name="plus-outline" white />}
              style={{height: 20, marginRight: 10}}
              onPress={() => {
                navigation.navigate('CreateChatScreen');
              }}></Button>
          </Layout>
          <ChatList chats={chatBuscar} upTopChat={upTopChat} />
        </>
      )}
    </Layout>
  );
};
