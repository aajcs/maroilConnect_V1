/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/self-closing-comp */
import {Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {MyIcon} from '../components/iu/MyIcon';
import {Button, Layout} from '@ui-kitten/components';
import {getUsersActions} from '../../actions/auth/getUsersActions';
import {useQuery} from '@tanstack/react-query';
import {UsuarioList} from '../components/usuario/UsuarioList';
import {FullScreenLoader} from '../components/iu/FullScreenLoader';
import {BuscarChat} from '../components/chat/BuscarChat';

export const CreateChatScreen = () => {
  const {isLoading, data: usuarios} = useQuery({
    queryKey: ['usuarios', 'infinite'],
    staleTime: 1000 * 60 * 5,
    queryFn: () => getUsersActions(),
  });
  const [usuarioBuscar, setUsuarioBuscar] = useState(usuarios || []);

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          // appearance="ghost"
          accessoryRight={<MyIcon name="close-outline" white />}
          // style={{marginTop: 20}}
          onPress={() => {
            navigation.goBack();
          }}></Button>
      ),
    });
  }, [navigation]);
  useEffect(() => {
    if (usuarios) {
      const usuariosFiltrados = usuarios.filter(
        usuario => usuario.chatMaroilConnect === true,
      );

      setUsuarioBuscar(usuariosFiltrados);
    }
  }, [usuarios]);
  return (
    <Layout>
      {isLoading ? (
        <FullScreenLoader />
      ) : (
        <>
          <BuscarChat data={usuarios || []} setData={setUsuarioBuscar} />
          <UsuarioList usuarios={usuarioBuscar || []} />
        </>
      )}
    </Layout>
  );
};
