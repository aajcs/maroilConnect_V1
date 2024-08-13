import {useFocusEffect, useRoute} from '@react-navigation/native';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {Text, Layout, Avatar, Card, Divider} from '@ui-kitten/components';
import {getUserActions} from '../../actions/auth/getUsersActions';
import {ImageBackground} from 'react-native';
import {useCallback} from 'react';
import {MyIcon} from '../components/iu/MyIcon';
import {useAuthStore} from '../store/auth/useAuthStore';
import {PostList} from '../components/posts/PostList';
import {getPostsUser} from '../../actions/posts/getPostsActions';
import {MenuActionsAvatarUsuario} from '../components/usuario/MenuActionsAvatarUsuario';

export const PerfilUsuarioScreen = () => {
  const queryClient = useQueryClient();
  const {user} = useAuthStore();

  const route = useRoute();
  const {userId} = route.params as {userId: string};
  const {isLoading, data: usuario} = useQuery({
    queryKey: ['usuario', 'infinite'],
    staleTime: 1000 * 60 * 5,
    queryFn: () => getUserActions(userId),
  });
  const {isLoading: isLoadingPost, data: postsUser} = useQuery({
    queryKey: ['postsUser', 'infinite'],
    staleTime: 1000 * 60 * 5,
    queryFn: () => getPostsUser(userId),
  });

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries({queryKey: ['usuario', 'infinite']});
      queryClient.invalidateQueries({queryKey: ['postsUser', 'infinite']});
    }, [queryClient, userId]),
  );

  return isLoading ? (
    <Text>Cargando...</Text>
  ) : (
    <Layout style={{flex: 1}}>
      <Layout
        style={{
          width: 100,
          height: 100,
          position: 'absolute',
          top: 125,
          zIndex: 1000,
          left: 16,
          backgroundColor: 'transparent',
        }}>
        {/* <Avatar
          style={{
            width: 100,
            height: 100,
          }}
          source={{
            uri: 'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2022/03/avatar-facebook-2632445.jpg?tf=3840x',
          }}></Avatar> */}
        {usuario?.avatarUnicoUser && usuario.avatarUnicoUser ? (
          <Avatar
            style={{width: 100, height: 100}}
            shape="round"
            source={{uri: usuario?.avatarUnicoUser}}
            defaultSource={require('../../assets/no-product-image.png')}
          />
        ) : (
          <Layout
            style={{
              width: 100,
              height: 100,
              position: 'absolute',
              // top: 125,
              // zIndex: 1000,
              // left: 16,

              borderRadius: 50,
              backgroundColor: '#ccc',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center', // Centra el texto
                fontSize: 50, // Ajusta el tamaño del texto
              }}>
              {usuario?.nombre.substring(0, 2).toUpperCase()}
            </Text>
          </Layout>
        )}
        {user?.id === usuario?.id && (
          <Layout
            level="3"
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              borderRadius: 100,
              padding: 5,
            }}>
            <MenuActionsAvatarUsuario user={user} />
          </Layout>
        )}
      </Layout>
      <ImageBackground
        style={{width: '100%', height: 200, backgroundColor: 'blue'}}
        source={{
          uri: 'https://www.bancaynegocios.com/wp-content/uploads/2023/07/Maroil-Trading.jpg',
        }}></ImageBackground>
      <Layout style={{padding: 16}}>
        <Card
          style={
            {
              // alignItems: 'center',
            }
          }>
          {user?.id === usuario?.id && (
            <Text
              style={{
                position: 'absolute',
                right: 0,
              }}
              onPress={() => {
                console.log('Editando usuario');
              }}
              category="h4">
              <MyIcon name="edit-outline" />
            </Text>
          )}

          <Text category="h4">{usuario?.nombre}</Text>
          <Text category="s1">
            Correo: {usuario?.correo.toLowerCase() || ''}
          </Text>
          <Text category="s1">
            Rol:{' '}
            {usuario?.rolesMaroilConnect
              ? usuario.rolesMaroilConnect.map(role => role).join(', ')
              : 'NotRol'}
          </Text>
          <Text category="s1">
            Chat: {usuario?.chatMaroilConnect ? 'Habilitado' : 'Deshabilitado'}
          </Text>
          <Text category="s1">Departamento: {usuario?.departamento || ''}</Text>
          {/* <Divider style={{marginVertical: 16}} />
          <Text category="p1">
            Aquí puedes agregar más información sobre el usuario, como su
            biografía, ubicación, etc.
          </Text> */}
        </Card>
      </Layout>
      {isLoadingPost ? (
        <Text>Cargando...</Text>
      ) : (
        <PostList post={postsUser || []} />
      )}
    </Layout>
  );
};
