// ChatCardList.tsx
// import {Post} from '../../../domain/entities/post';
import {useEffect, useState} from 'react';
import {Avatar, Layout, Text, useTheme} from '@ui-kitten/components';
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {Chat} from '../../../domain/entities/chat';
import {useAuthStore} from '../../store/auth/useAuthStore';
import {DateTime} from 'luxon';
import {getChatMessageLastsActions} from '../../../actions/chat/getChatMessageLastsActions';
import {getChatMessageTotalsActions} from '../../../actions/chat/getChatMessageTotalsActions';
import {socket} from '../../utils/sockets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {UnreadMessages} from '../../../actions/chat/UnreadMessagesActions';
import AwesomeAlert from 'react-native-awesome-alerts';

interface Props {
  chat: Chat;
  index: string;
  upTopChat: (chatId: string) => void;
}
const unreadMessagesController = new UnreadMessages();

export const ChatCardList = ({chat, upTopChat}: Props) => {
  const {participanteOne, participanteTwo} = chat;
  const navigation = useNavigation();
  const theme = useTheme();

  const [lastMessage, setLastMessage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const [totalUnreadMessages, setTotalUnreadMessages] = useState(0);
  const [showDelete, setShowDelete] = useState(false);
  const {user} = useAuthStore();
  const userChat =
    user?.id === participanteOne.id ? participanteTwo : participanteOne;

  const colorScheme = useColorScheme();
  const createChat = () => {
    setTotalUnreadMessages(0);
    navigation.navigate('chatUnico', {screen: 'ChatScreen', params: {chat}});
  };

  useEffect(() => {
    (async () => {
      try {
        const chatMenssageLasts = await getChatMessageLastsActions({
          id: chat._id,
        });
        if (chatMenssageLasts?.messageChatMessage !== 'undefined') {
          setLastMessage(chatMenssageLasts);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [chat._id]);
  useEffect(() => {
    (async () => {
      try {
        const chatMenssageTotals = await getChatMessageTotalsActions({
          id: chat._id,
        });
        const totalReadMessages =
          await unreadMessagesController.getTotalReadMessages(chat._id);
        if (chatMenssageTotals) {
          setTotalUnreadMessages(chatMenssageTotals - totalReadMessages);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [chat._id]);
  useEffect(() => {
    socket?.emit('subscribe', `chat-${chat._id}`);
    socket?.on('newMessageNotify', newMessageNotify1);
  }, []);
  const newMessageNotify1 = async newMessageNotify1 => {
    if (newMessageNotify1.chatIdChatMessage === chat._id) {
      if (newMessageNotify1.userChatMessage !== user.id) {
        upTopChat(chat._id);
        setLastMessage(newMessageNotify1);

        const activeChatId = await AsyncStorage.getItem('ACTIVE_CHAT_ID');

        if (activeChatId !== newMessageNotify1.chatIdChatMessage) {
          setTotalUnreadMessages(prevState => prevState + 1);
        }
      }
    }
  };

  return (
    <Layout
      style={[
        styles.container,
        {shadowColor: colorScheme !== 'dark' ? '#000' : '#fff'},
      ]}>
      <AwesomeAlert
        // overlayStyle={{backgroundColor: theme['background-basic-color-1']}}
        titleStyle={{color: theme['text-basic-color']}}
        messageStyle={{color: theme['text-basic-color']}}
        contentContainerStyle={{
          backgroundColor: theme['background-basic-color-1'],
        }}
        show={showAlert}
        title="Eliminar chat"
        message="¿Quieres eliminar este chat?"
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, cancelar"
        confirmText="Sí, confirmar"
        onCancelPressed={() => {
          setShowAlert(false);
        }}
        onConfirmPressed={() => {
          console.log('Avatar confirmado');
        }}
        onDismiss={() => {
          setShowAlert(false);
        }}
      />
      <TouchableOpacity
        key={chat._id}
        style={styles.item}
        onPress={() => {
          createChat();
        }} // Add this line;
        onLongPress={() => {
          setShowAlert(true);
        }}>
        {userChat?.avatarUnicoUser ? (
          <Avatar
            style={styles.avatar}
            shape="round"
            source={{
              uri: userChat.avatarUnicoUser,
            }}
            defaultSource={require('../../../assets/no-product-image.png')}
          />
        ) : (
          <Layout
            style={{
              ...styles.avatar,
              borderRadius: 25,
              backgroundColor: '#ccc',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20}}>
              {userChat.nombre.substring(0, 2).toUpperCase()}
            </Text>
          </Layout>
        )}
        <Layout style={styles.infoContent}>
          <Layout style={styles.info}>
            <Text style={styles.identity}>{userChat.nombre}</Text>
            <Text style={styles.message} numberOfLines={2}>
              {lastMessage?.messageChatMessage || '  '}
            </Text>
          </Layout>

          <Layout style={styles.notify}>
            {lastMessage && lastMessage.createdAt ? (
              <Text style={styles.time}>
                {DateTime.fromISO(
                  new Date(lastMessage.createdAt).toISOString(),
                ).toFormat('HH:mm')}
              </Text>
            ) : null}

            {totalUnreadMessages ? (
              <Layout style={styles.totalUnreadContent}>
                <Text style={styles.totalUnread}>
                  {totalUnreadMessages < 99 ? totalUnreadMessages : 99}
                </Text>
              </Layout>
            ) : null}
          </Layout>
        </Layout>
        {/* <Layout>
          <Text style={styles.name}>{userChat.nombre}</Text>
          <Text style={styles.email}>{userChat.correo}</Text>
        </Layout> */}
      </TouchableOpacity>
    </Layout>
  );
};
const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
    // borderRadius: 8,
    // margin: 5,
    // padding: 0,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
    paddingHorizontal: 10,
    // marginBottom: 50,
    // paddingBottom: 50,
  },
  avatar: {
    // margin: 8,
    width: 50,
    height: 50,
    marginRight: 10,
  },
  item: {
    flexDirection: 'row',
    // borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingVertical: 3,
    alignItems: 'center',
  },
  name: {
    fontWeight: '600',
    // color: '#fff',
    fontSize: 16,
  },
  email: {
    // color: '#fff',
    opacity: 0.6,
    marginTop: 2,
  },
  infoContent: {
    flex: 1,
    flexDirection: 'row',
    // borderBottomWidth: 1,
    // borderBottomColor: '#333',
    // marginLeft: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
    height: '100%',
  },
  info: {
    flex: 1,
  },
  identity: {
    fontWeight: '600',
    // color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  message: {
    // color: '#fff',
    opacity: 0.4,
    fontSize: 15,
  },
  notify: {
    alignItems: 'flex-end',
  },
  time: {
    opacity: 0.6,
    // color: '#fff',
    fontSize: 12,
    marginBottom: 5,
  },
  totalUnreadContent: {
    backgroundColor: '#06b6d4',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 19,
    height: 19,
  },
  totalUnread: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
