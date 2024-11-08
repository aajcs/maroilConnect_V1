import {Layout, Avatar} from '@ui-kitten/components';
import {StyleSheet, Text} from 'react-native';
import {Usuario} from '../../../domain/entities/usuario';
import FastImage from 'react-native-fast-image';

interface Props {
  usuario: Usuario;
}

export const AvatarNombre = ({usuario}: Props) => {
  return usuario?.avatarUnicoUser ? (
    <FastImage
      style={{...styles.avatar, borderRadius: 50}}
      source={{
        uri: usuario.avatarUnicoUser,
        headers: {Authorization: 'someAuthToken'},
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.cover}
    />
  ) : (
    <Layout style={styles.avatarLayout}>
      <Text style={styles.avatarText}>
        {usuario?.nombre.substring(0, 2).toUpperCase()}
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  avatarLayout: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    textAlign: 'center', // Centra el texto
    fontSize: 25, // Ajusta el tamaño del texto
  },
});
