import {useInfiniteQuery} from '@tanstack/react-query';
import {Button, Layout} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
  ScrollView,
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
  fetchNextPage,
  isFetchingNextPage,
}) => {
  const [contentVisible, setContentVisible] = useState(false);

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
  const {height: viewportHeight} = useWindowDimensions();

  const {logout, user} = useAuthStore();
  const {rolesMaroilConnect} = user || {}; // Add type guard to ensure 'user' is defined

  const hasNotRol = rolesMaroilConnect?.includes('NotRol');

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
                !hasNotRol ? (
                  isLoading ? (
                    <FullScreenLoader />
                  ) : (
                    <ScrollView>
                      {data.map(item => {
                        return <CardManejoSolido key={item.id} data={item} />;
                      })}
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
