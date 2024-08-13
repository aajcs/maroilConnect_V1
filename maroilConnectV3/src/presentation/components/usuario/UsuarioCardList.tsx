// UsuarioCardList.tsx
// import {Post} from '../../../domain/entities/post';
import {Avatar, Layout, Text} from '@ui-kitten/components';
import {StyleSheet, TouchableOpacity, useColorScheme} from 'react-native';
import {Usuario} from '../../../domain/entities/usuario';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {updateCreateChatAction} from '../../../actions/chat/updateCreateChatAction';
import {useNavigation} from '@react-navigation/native';
import {Chat} from '../../../domain/entities/chat';
import {useAuthStore} from '../../store/auth/useAuthStore';
import {useState} from 'react';

interface Props {
  usuario: Usuario;
  index: string;
}

export const UsuarioCardList = ({usuario}: Props) => {
  const {user} = useAuthStore();
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [isPressed, setIsPressed] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: Chat) => {
      const chatCrate = await updateCreateChatAction(data);
      return chatCrate;
    },

    onSuccess: async chatCrate => {
      // console.log('data', chatCrate.chatSave.id);

      await queryClient.invalidateQueries({queryKey: ['chats', 'infinite']});
      if (chatCrate.chatSave) {
        navigation.navigate('chatUnico', {
          screen: 'ChatScreen',
          params: {chat: {...chatCrate.chatSave, _id: chatCrate.chatSave.id}},
        });
      }
      if (chatCrate.chat) {
        navigation.navigate('chatUnico', {
          screen: 'ChatScreen',
          params: {chat: {...chatCrate.chat, _id: chatCrate.chat.id}},
        });
      }
      navigation.goBack();
    },
    onSettled: () => {
      setIsPressed(false);
    },
  });
  const createChar = () => {
    const {id: participanteOne} = user || {};
    const {id: participanteTwo} = usuario;
    const data: Chat = {
      participanteOne,
      participanteTwo,
    };

    mutation.mutate(data);
  };
  const handlePress = () => {
    if (!isPressed) {
      setIsPressed(true);
      createChar();
    }
  };
  return (
    <Layout
      style={[
        styles.container,
        {shadowColor: colorScheme !== 'dark' ? '#000' : '#fff'},
      ]}>
      <TouchableOpacity
        key={usuario.id}
        style={styles.item}
        onPress={handlePress} // Add this line;
      >
        {usuario?.avatarUnicoUser && usuario.avatarUnicoUser ? (
          <Avatar
            style={styles.avatar}
            shape="round"
            source={{uri: usuario?.avatarUnicoUser}}
            defaultSource={require('../../../assets/no-product-image.png')}
          />
        ) : (
          <Layout
            style={{
              ...styles.avatar,

              borderRadius: 50,
              backgroundColor: '#ccc',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center', // Centra el texto
                fontSize: 25, // Ajusta el tamaño del texto
              }}>
              {usuario?.nombre.substring(0, 2).toUpperCase()}
            </Text>
          </Layout>
        )}
        {/* <Avatar
          style={styles.avatar}
          shape="round"
          source={{
            uri: 'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2022/03/avatar-facebook-2632445.jpg?tf=3840x',
          }}
        /> */}
        <Layout>
          <Text style={styles.name}>{usuario.nombre}</Text>
          <Text style={styles.email}>{usuario.correo}</Text>
        </Layout>
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
    borderBottomWidth: 1,
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
});
