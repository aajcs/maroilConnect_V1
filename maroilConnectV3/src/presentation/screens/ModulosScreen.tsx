import {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Layout, useTheme} from '@ui-kitten/components';
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {MyIcon} from '../components/iu/MyIcon';
import {ModalGlobal} from '../components/iu/ModalGlobal';
import {getPostsBorrador} from '../../actions/posts/getPostsActions';
import {getManejoSolidosActions} from '../../actions/manejoSolido/getManejoSolidosActions';
import {ModalManejoSolido} from '../components/manejoSolido/ModalManejoSolido';
import {ModalPoliticasUso} from '../components/politicas/ModalPoliticasUso';
import {ModalContruction} from '../components/iu/ModalContruction';
import {ModalUsuario} from '../components/usuario/ModalUsuario';

export const ModulosScreen = () => {
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleUsuario, setModalVisibleUsuario] = useState(false);
  const [modalVisibleIdeas, setModalVisibleIdeas] = useState(false);
  const [modalVisibleIdeas2, setModalVisibleIdeas2] = useState(false);
  const [modalVisibleIdeas3, setModalVisibleIdeas3] = useState(false);
  const [modalVisibleManejoSolido, setModalVisibleManejoSolido] =
    useState(false);
  const [modalVisiblePoliticaUso, setModalVisiblePoliticaUso] = useState(false);
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
  const MyLayout = ({onPress, iconName, text}: any) => (
    <Layout style={styles.layout} level="3">
      <TouchableOpacity onPress={onPress}>
        <Layout style={styles.layout} level="3">
          <MyIcon
            name={iconName}
            height={50}
            width={50}
            color={theme['color-primary-500']}
          />
          <Text
            style={{textAlign: 'center', flexWrap: 'wrap'}}
            numberOfLines={2}>
            {text}
          </Text>
        </Layout>
      </TouchableOpacity>
    </Layout>
  );
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
      <ModalPoliticasUso
        modalVisible={modalVisiblePoliticaUso}
        setModalVisible={setModalVisiblePoliticaUso}
      />
      <ModalContruction
        modalVisible={modalVisibleIdeas}
        setModalVisible={setModalVisibleIdeas}
        message="Tiene la finalidad de elegir entre una data pre cargada de publicaciones de fechas resaltantes como el día de la tierra, día del agua, día del reciclaje, entre otros, para que el usuario pueda seleccionar y publicar en la red social."
      />
      <ModalContruction
        modalVisible={modalVisibleIdeas2}
        setModalVisible={setModalVisibleIdeas2}
        message="Tiene la finalidad de mostrar la información del manejo de sólidos de la app Maroil Trading, al mismo formato que la de manejo de sólidos."
      />
      <ModalContruction
        modalVisible={modalVisibleIdeas3}
        setModalVisible={setModalVisibleIdeas3}
        message="Tiene la finalidad de mostrar la información del reporte mensual de la app Maroil Trading, al mismo formato que la de manejo de sólidos."
      />
      <ModalUsuario
        modalVisible={modalVisibleUsuario}
        setModalVisible={setModalVisibleUsuario}
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
                  color={theme['color-primary-500']}
                />
                <Layout style={styles.totalUnreadContent}>
                  <Text style={styles.totalUnread} status="info">
                    {postParaAprobar < 9 ? postParaAprobar : '9+'}
                  </Text>
                </Layout>
              </Layout>
              <Text>Aprobar post</Text>
            </Layout>
          </TouchableOpacity>
        </Layout>
        <MyLayout
          onPress={() => setModalVisiblePoliticaUso(true)}
          iconName="alert-triangle-outline"
          text="Políticas"
        />
        <MyLayout
          onPress={() => setModalVisibleUsuario(true)}
          iconName="people-outline"
          text="Configuración de usuarios"
        />
      </Layout>
      <Layout style={styles.container}>
        <MyLayout
          onPress={() => setModalVisibleIdeas(true)}
          iconName="bulb-outline"
          text="Ideas de publicación"
        />
        <MyLayout
          onPress={() => setModalVisibleManejoSolido(true)}
          iconName="cube-outline"
          text="Manejo de sólido"
        />
        <MyLayout
          onPress={() => setModalVisibleIdeas2(true)}
          iconName="droplet-outline"
          text="Manejo de líquido"
        />
      </Layout>
      <Layout style={styles.container}>
        <MyLayout
          onPress={() => setModalVisibleIdeas3(true)}
          iconName="activity-outline"
          text="Reporte de gerencia"
        />
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
    paddingHorizontal: 10,
    height: 150,
  },
  layout: {
    flex: 1,
    margin: 10,
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
