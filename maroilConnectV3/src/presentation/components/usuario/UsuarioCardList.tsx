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

interface Props {
  usuario: Usuario;
  index: string;
}

export const UsuarioCardList = ({usuario}: Props) => {
  const {user} = useAuthStore();
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: Chat) => {
      await updateCreateChatAction(data);
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['chats', 'infinite']});
      navigation.goBack();
    },
  });
  const createChar = () => {
    const {id: participanteOne} = user || {};
    console.log('participanteOne', participanteOne);
    const {id: participanteTwo} = usuario;
    console.log('participanteOne', participanteTwo);
    const data: Chat = {
      participanteOne,
      participanteTwo,
    };

    mutation.mutate(data);
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
        onPress={() => {
          createChar();
        }} // Add this line;
      >
        <Avatar
          style={styles.avatar}
          shape="round"
          source={{
            uri: 'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2022/03/avatar-facebook-2632445.jpg?tf=3840x',
          }}
        />
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
    margin: 8,
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
