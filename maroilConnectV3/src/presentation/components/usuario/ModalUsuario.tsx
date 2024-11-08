import {Button, Layout, Text} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {Modal, SafeAreaView} from 'react-native';
import {UsuarioList} from './UsuarioList';
import {useAuthStore} from '../../store/auth/useAuthStore';
import {useQuery} from '@tanstack/react-query';
import {getUserAdministracionActions} from '../../../actions/auth/getUsersActions';
import {BuscarChat} from '../chat/BuscarChat';
import {FullScreenLoader} from '../iu/FullScreenLoader';
import {FullScreenAccessDenied} from '../iu/FullScreenAccessDenied';

interface MyModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

export const ModalUsuario: React.FC<MyModalProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  const [contentVisible, setContentVisible] = useState(false);
  const {user} = useAuthStore();

  const {rolesMaroilConnect} = user || {}; // Add type guard to ensure 'user' is defined

  const hasNotRol = rolesMaroilConnect?.some(role =>
    ['administrador', 'superadmin'].includes(role),
  );
  const {isLoading, data: usuarios} = useQuery({
    queryKey: ['usuariosAdministracion', 'infinite'],
    staleTime: 1000 * 60 * 5,
    queryFn: () => getUserAdministracionActions(user!),
  });
  const [usuarioBuscar, setUsuarioBuscar] = useState(usuarios || []);

  useEffect(() => {
    if (usuarios) {
      setUsuarioBuscar(usuarios);
    }
  }, [usuarios]);
  useEffect(() => {
    if (modalVisible) {
      // Use a timeout to delay the rendering of the content
      const timeoutId = setTimeout(() => {
        setContentVisible(true);
      }, 100); // Adjust the delay as needed

      // Clean up the timeout when the component is unmounted or when 'modalVisible' changes
      return () => clearTimeout(timeoutId);
    } else {
      setContentVisible(false);
    }
  }, [modalVisible]);

  return (
    <Modal visible={modalVisible} animationType="slide">
      <Layout
        style={{
          flex: 1,
        }}>
        {contentVisible && (
          <SafeAreaView style={{flex: 1}}>
            {}
            <Button onPress={() => setModalVisible(false)}>Cerrar</Button>
            <Layout
              style={{
                backgroundColor: 'red',
                flex: 1,
              }}>
              {hasNotRol ? (
                isLoading ? (
                  <FullScreenLoader />
                ) : (
                  <>
                    <BuscarChat
                      data={usuarios || []}
                      setData={setUsuarioBuscar}
                    />
                    <UsuarioList
                      usuarios={usuarioBuscar || []}
                      administracion={true}
                    />
                  </>
                )
              ) : (
                <FullScreenAccessDenied />
              )}
            </Layout>
          </SafeAreaView>
        )}
      </Layout>
    </Modal>
  );
};
