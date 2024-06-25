import {View, Text, StyleSheet} from 'react-native';
import {DateTime} from 'luxon';
import {useAuthStore} from '../../store/auth/useAuthStore';
import {chatMenssage} from '../../../domain/entities/chatMenssage';

interface Props {
  chatMenssage: chatMenssage;
}

export const ChatMessageCard = ({chatMenssage}: Props) => {
  const {user} = useAuthStore();
  const isMe = user.id === chatMenssage.userChatMessage.id;
  const styles = styled(isMe);
  const createMessage = new Date(chatMenssage.createdAt);

  return (
    <View style={styles.content}>
      <View style={styles.message}>
        <Text style={styles.text}>{chatMenssage.messageChatMessage}</Text>
        <Text style={styles.date}>
          {DateTime.fromISO(createMessage.toISOString()).toFormat('HH:mm')}
        </Text>
      </View>
    </View>
  );
};

export const styled = isMe => {
  return StyleSheet.create({
    content: {
      flexDirection: 'row',
      justifyContent: isMe ? 'flex-end' : 'flex-start',
      marginHorizontal: 10,
      marginBottom: 10,
    },
    message: {
      flex: 1,
      backgroundColor: isMe
        ? 'rgba(143, 155, 179, 0.54)'
        : 'rgba(123, 155, 179, 0.24)',
      maxWidth: '80%',
      borderRadius: 10,
      paddingVertical: 6,
      paddingHorizontal: 10,
    },
    text: {
      //   color: '#fff',
      fontSize: 16,
    },
    date: {
      opacity: 0.6,
      //   color: '#fff',
      fontSize: 12,
      marginTop: 2,
      textAlign: 'right',
    },
  });
};
