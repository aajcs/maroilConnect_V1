import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import {Button, Layout, Text} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {getPostsBorrador} from '../../../actions/posts/getPostsActions';

import {useAuthStore} from '../../store/auth/useAuthStore';
import {PostList} from '../posts/PostList';
import {FullScreenLoader} from '../iu/FullScreenLoader';
import {FullScreenAccessDenied} from '../iu/FullScreenAccessDenied';
import {CardManejoSolido} from './CardManejoSolido';

interface MyModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  isLoading: boolean;
  data: any;
  fetchNextPage: any;
  isFetchingNextPage: boolean;
}

export const ModalManejoSolido: React.FC<MyModalProps> = ({
  modalVisible,
  setModalVisible,
  isLoading,
  data,
}) => {
  const [contentVisible, setContentVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const queryClient = useQueryClient();

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

  const {user} = useAuthStore();

  const {rolesMaroilConnect, roles, apps} = user || {}; // Add type guard to ensure 'user' is defined

  const hasNotRol = rolesMaroilConnect?.some(role =>
    ['lectura', 'NotRol', 'colaborador'].includes(role),
  );
  const hasNotRolMaroil = roles?.some(role =>
    ['SUPERADMIN', 'ADMIN', 'OPERADOR', 'LECTURA', 'CLIENTE'].includes(role),
  );
  const hasNotAppMaroil = apps?.some(app =>
    ['SUPERAPPS', 'CONTROLAPPS'].includes(app),
  );
  const onPullToRefresh = async () => {
    setIsRefreshing(true);
    queryClient.invalidateQueries({queryKey: ['manejoSolidos', 'infinite']});

    setIsRefreshing(false);
  };
  return (
    <Modal visible={modalVisible} animationType="slide">
      <Layout
        style={{
          flex: 1,
        }}>
        {contentVisible && (
          <SafeAreaView style={{flex: 1}}>
            <Button onPress={() => setModalVisible(false)}>Cerrar</Button>
            <Layout
              style={{
                flex: 1,
                // backgroundColor: 'red',
              }}>
              {
                /* Add conditional rendering based on 'rolesMaroilConnect' */
                !hasNotRol && hasNotAppMaroil && hasNotRolMaroil ? (
                  isLoading ? (
                    <FullScreenLoader />
                  ) : (
                    <ScrollView
                      bounces={!isRefreshing}
                      refreshControl={
                        <RefreshControl
                          refreshing={isRefreshing}
                          onRefresh={onPullToRefresh}
                        />
                      }>
                      {data ? (
                        data.map(item => {
                          return <CardManejoSolido key={item.id} data={item} />;
                        })
                      ) : (
                        <Text>Sin Datos</Text>
                      )}
                    </ScrollView>
                  )
                ) : (
                  <FullScreenAccessDenied />
                )
              }
              {/* <FullScreenLoader /> */}
              {/* <Text>{JSON.stringify(posts, null, 2)}</Text> */}
              {/* <Icon name="facebook" /> */}
              {/* <Button onPress={logout} accessoryLeft={<Icon name="log-out-outline" />}>
        Cerrar secion
      </Button> */}
            </Layout>
          </SafeAreaView>
        )}
      </Layout>
    </Modal>
  );
};
