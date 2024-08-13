import {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Layout} from '@ui-kitten/components';
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {MyIcon} from '../components/iu/MyIcon';
import {ModalGlobal} from '../components/iu/ModalGlobal';
import {useFocusEffect} from '@react-navigation/native';
import {getPostsBorrador} from '../../actions/posts/getPostsActions';
import {getManejoSolidosActions} from '../../actions/manejoSolido/getManejoSolidosActions';
import {ModalManejoSolido} from '../components/manejoSolido/ModalManejoSolido';

export const ModulosScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleManejoSolido, setModalVisibleManejoSolido] =
    useState(false);
  const queryClient = useQueryClient();
  const [postParaAprobar, setPostParaAprobar] = useState(0);
  const {isLoading, isFetchingNextPage, data, fetchNextPage} = useInfiniteQuery(
    {
      queryKey: ['postsBorrador', 'infinite'],
      staleTime: 1000 * 60 * 60,
      initialPageParam: 0,
      queryFn: async params => await getPostsBorrador(params.pageParam),
      getNextPageParam: (lastPage, allPages) => allPages.length,
    },
  );
  const {isLoading: isLoadingManejoSolido, data: manejoSolidos} = useQuery({
    queryKey: ['manejoSolidos', 'infinite'],
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const manejoSolidosData = await getManejoSolidosActions();
      return manejoSolidosData;
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await queryClient.getQueryData([
        'postsBorrador',
        'infinite',
      ]);
      const postParaAprobar = data?.pages.flat().length || 0;
      setPostParaAprobar(postParaAprobar);
    };

    fetchData();
  }, [data]);
  return (
    <ScrollView>
      <ModalGlobal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        isLoading={isLoading}
        data={data}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
      <ModalManejoSolido
        modalVisible={modalVisibleManejoSolido}
        setModalVisible={setModalVisibleManejoSolido}
        isLoading={isLoadingManejoSolido}
        data={manejoSolidos}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
      <Layout style={styles.container}>
        <Layout style={styles.layout} level="3">
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Layout style={styles.layout} level="3">
              <Layout level="3">
                <MyIcon
                  name="checkmark-circle-outline"
                  height={50}
                  width={50}
                />
                <Layout style={styles.totalUnreadContent}>
                  <Text style={styles.totalUnread} status="info">
                    {postParaAprobar < 9 ? postParaAprobar : '9+'}
                  </Text>
                </Layout>
              </Layout>
              <Text>Aprobar Post</Text>
              <Text numberOfLines={1} ellipsizeMode="tail">
                {postParaAprobar < 10
                  ? `Tienes ${postParaAprobar} por aprobar`
                  : 'Tienes muchos post para aprobar'}
              </Text>
            </Layout>
          </TouchableOpacity>
        </Layout>

        <Layout style={styles.layout} level="3">
          <MyIcon name="alert-triangle-outline" height={50} width={50} />
          <Text>Politicas de Uso</Text>
        </Layout>
        <Layout style={styles.layout} level="3">
          <MyIcon name="people-outline" height={50} width={50} />
          <Text style={{textAlign: 'center'}}>Administracion de usuarios</Text>
        </Layout>
      </Layout>
      <Layout style={styles.container}>
        <Layout style={styles.layout} level="3">
          <MyIcon name="bulb-outline" height={50} width={50} />
          <Text style={{textAlign: 'center'}}> Ideas de Publicacion</Text>
        </Layout>
        <TouchableOpacity onPress={() => setModalVisibleManejoSolido(true)}>
          <Layout style={styles.layout} level="3">
            <MyIcon name="file-text-outline" height={50} width={50} />
            <Text>Manejo de solidos</Text>
          </Layout>
        </TouchableOpacity>
        <Layout style={styles.layout} level="3">
          <MyIcon name="file-text-outline" height={50} width={50} />
          <Text>Manejo de liquidos</Text>
        </Layout>
      </Layout>
      <Layout style={styles.container}>
        <Layout style={styles.layout} level="3">
          <MyIcon name="activity-outline" height={50} width={50} />
          <Text>Reporte gerencia</Text>
        </Layout>
        <Layout style={styles.layout}>
          {/* <MyIcon name="home" height={50} width={50} />
          <Text>Reporte gerencia</Text> */}
        </Layout>
        <Layout style={styles.layout}>
          {/* <MyIcon name="home" height={50} width={50} />
          <Text>Reporte gerencia</Text> */}
        </Layout>
      </Layout>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // padding: 10,
    paddingHorizontal: 10,
    height: 150,
  },
  layout: {
    margin: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  totalUnreadContent: {
    // backgroundColor: '#06b6d4',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 19,
    height: 19,
    position: 'absolute',
  },
  totalUnread: {
    // color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
