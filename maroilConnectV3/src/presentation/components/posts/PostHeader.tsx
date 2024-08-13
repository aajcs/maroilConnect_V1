import {Avatar, Text, Layout} from '@ui-kitten/components';
import {getRelativeTime} from '../../utils/timeUtil';
import {Post} from '../../../domain/entities/post';
import {MenuActions} from './MenuActions';
import {StyleSheet, Touchable} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {useAuthStore} from '../../store/auth/useAuthStore';

interface Props {
  post: Post;
  onEdit: () => void;
  onDelete: () => void;
}

export const PostHeader = ({post, onEdit, onDelete}: Props) => {
  const navigation = useNavigation();
  const {user} = useAuthStore();

  return (
    <Layout style={{flexDirection: 'row', padding: 5}}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('PerfilUsuarioScreen', {
            userId: post.authorPost.id,
          });
        }}
        style={{flexDirection: 'row'}}>
        {post.authorPost?.avatarUnicoUser ? (
          <Avatar
            style={styles.avatar}
            shape="round"
            source={{uri: post.authorPost?.avatarUnicoUser}}
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
              {post.authorPost?.nombre.substring(0, 2).toUpperCase()}
            </Text>
          </Layout>
        )}
      </TouchableOpacity>

      <Layout>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('PerfilUsuarioScreen', {
              userId: post.authorPost.id,
            });
          }}>
          <Text category="s1" style={{fontWeight: 'bold'}}>
            {post.authorPost.nombre}
          </Text>
        </TouchableOpacity>
        <Text category="p2">
          {post.categoriaPost && post.categoriaPost?.toString()}
        </Text>
      </Layout>

      <Layout style={{flex: 1}} />
      <Layout>
        <Text category="label">
          {post.createdAt && post.updatedAt && post.estatusPost === 'Aprobado'
            ? getRelativeTime(post.fechaAprobadoPost?.toString() ?? '')
            : getRelativeTime(post.createdAt?.toString() ?? '')}
        </Text>
      </Layout>
      {(user?.rolesMaroilConnect.some(role =>
        ['admin', 'superadmin', 'colaborador'].includes(role),
      ) ||
        post.authorPost.id === user?.id) && (
        <MenuActions
          onEdit={onEdit}
          onDelete={onDelete}
          postId={post.id}
          postEstatus={post.estatusPost}
          postAuthorId={post.authorPost.id}
          user={user}
        />
      )}
    </Layout>
  );
};
const styles = StyleSheet.create({
  avatar: {
    // margin: 8,
    width: 50,
    height: 50,
    marginRight: 10,
  },
});
