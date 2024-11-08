import {
  DrawerContentComponentProps,
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  Avatar,
  Button,
  Drawer,
  DrawerItem,
  IndexPath,
  Layout,
  Text,
  Toggle,
  ToggleProps,
} from '@ui-kitten/components';
import {MenuAbajoPrincipalNavitation} from './MenuAbajoPrincipalNavitation';
import {MenuStackPostNavigation} from './MenuStackPostNavigation';
import {useAuthStore} from '../store/auth/useAuthStore';
import {initSockets} from '../utils/sockets';
import {PerfilUsuarioScreen} from '../screens/PerfilUsuarioScreen';
import {MyIcon} from '../components/iu/MyIcon';
import {ChatScreen} from '../screens/ChatScreen';
import {MenuStackChatUnicoNavigation} from './MenuStackChatUnicoNavigation';
import {Alert, Image, SafeAreaView, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useEffect, useState} from 'react';
import {useConfigStore} from '../store/iu/useConfigStore';
import {AvatarNombre} from '../components/iu/AvatarNombre';

initSockets();

const {Navigator, Screen} = createDrawerNavigator();

const DrawerContent = ({navigation, state}: {navigation: any; state: any}) => {
  const {logout} = useAuthStore();
  return (
    <SafeAreaView>
      <Drawer
        selectedIndex={new IndexPath(state.index)}
        onSelect={index => navigation.navigate(state.routeNames[index.row])}>
        <DrawerItem title="Home" />
        <DrawerItem title="Perfil" />
        {/* <DrawerItem title="Pantallas" /> */}
        <DrawerItem
          title={() => <Button onPress={logout}>Cerrar secion</Button>}
        />
      </Drawer>
    </SafeAreaView>
  );
};
const useToggleState = (initialState = false): ToggleProps => {
  const [checked, setChecked] = useState(initialState);

  const onCheckedChange = (isChecked): void => {
    setChecked(isChecked);
  };

  return {checked, onChange: onCheckedChange};
};

export const MenuLateralPrincipalNavitagion = () => {
  const {user} = useAuthStore();
  const userId = user?.id;
  return (
    <Navigator
      // drawerContent={DrawerContent}
      drawerContent={props => <MenuInterno {...props} />}
      // drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={({navigation}) => ({
        headerLeft: () => null,
        drawerPosition: 'right',
        headerShown: true,

        headerTitle: () => (
          <Layout style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../assets/LogoMaroilConnect.png')}
              style={{width: 30, height: 30, marginRight: 10}}
            />
            <Text>Maroil Connect</Text>
          </Layout>
        ),
        headerRight: () => (
          <Button appearance="ghost" onPress={() => navigation.openDrawer()}>
            <MyIcon name="menu" />
          </Button>
        ),
      })}>
      <Screen name="Home" component={MenuAbajoPrincipalNavitation} />
      <Screen
        name="PerfilUsuarioScreen"
        component={PerfilUsuarioScreen}
        initialParams={{userId}}
      />
      <Screen
        name="pantallas"
        component={MenuStackPostNavigation}
        options={{drawerLabel: () => null}}
      />
      <Screen
        name="chatUnico"
        component={MenuStackChatUnicoNavigation}
        options={{drawerLabel: () => null}}
      />
      {/* <Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          headerShown: false,
          title: 'Nuevo Chat',
          presentation: 'modal',
          // headerLeft: null,

          // headerShown: false,
          // cardStyle: {backgroundColor: 'transparent', opacity: 0.9},
          // cardOverlayEnabled: true,
          // cardStyleInterpolator: ({current: {progress}}) => {
          //   return {
          //     cardStyle: {
          //       opacity: progress,
          //     },
          //   };
          // },
        }}
      /> */}
    </Navigator>
  );
};
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Home"
        style={{backgroundColor: 'red'}}
        onPress={() => props.navigation.navigate('Home')}
      />
      <DrawerItem
        label="Custom Item"
        onPress={() => alert('Custom Item Pressed')}
        activeTintColor="#6200ee"
        inactiveTintColor="#000"
        labelStyle={{marginLeft: -16}}
      />
    </DrawerContentScrollView>
  );
}
const MenuInterno = ({navigation, state}: DrawerContentComponentProps) => {
  const {user, logout} = useAuthStore();
  const {checked, toggle, load, save} = useConfigStore();
  const primaryToggleState = useToggleState();
  // console.log('user', JSON.stringify(user, null, 2));
  const filteredRoutes = state.routes.filter(
    item =>
      item.name !== 'PerfilUsuarioScreen' &&
      item.name !== 'pantallas' &&
      item.name !== 'chatUnico',
  );
  const newState = {
    ...state,
    routes: filteredRoutes,
    routeNames: filteredRoutes.map(route => route.name),
  };

  useEffect(() => {
    load();
  }, [load]);

  const handleChange = () => {
    toggle();
    save();
  };
  return (
    // <Text>MenuInterno</Text>
    <Layout style={{flex: 1}}>
      <SafeAreaView>
        <Layout style={stylesLocal.menuContainerPerfil}>
          <Layout style={stylesLocal.avatarContainer}>
            {user && <AvatarNombre usuario={user} />}
          </Layout>
          <Layout style={stylesLocal.containerNombrePerfil}>
            <Text
              style={stylesLocal.textNombrePerfil}
              adjustsFontSizeToFit
              numberOfLines={1}>
              {/* {authState.username} */}
              {user?.nombre}
            </Text>
            <TouchableOpacity
              style={stylesLocal.buttonlVerPerfil}
              onPress={() => {
                navigation.navigate('PerfilUsuarioScreen', {
                  userId: user?.id,
                });
              }}>
              <Layout style={{flexDirection: 'row'}}>
                <Text style={stylesLocal.textVerPerfil}> Ver el perfil</Text>
              </Layout>
            </TouchableOpacity>
          </Layout>
          <Layout
            style={{flexDirection: 'row', justifyContent: 'flex-end', flex: 1}}>
            <TouchableOpacity
              style={stylesLocal.buttonOpciones}
              onPress={() => {}}>
              <Layout style={{flexDirection: 'row'}}>
                <Text>
                  <MyIcon name="settings-2-outline" />
                </Text>
              </Layout>
            </TouchableOpacity>
            <TouchableOpacity
              style={stylesLocal.buttonOpciones}
              onPress={() => {
                Alert.alert(
                  'Cerrar sesión', // Título del cuadro de diálogo
                  '¿Estás seguro de que quieres cerrar la sesión?', // Mensaje del cuadro de diálogo
                  [
                    {
                      text: 'Cancelar',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: () => {
                        logout();
                        navigation.reset({
                          index: 0,
                          routes: [{name: 'Home'}], // Reemplaza 'Login' con el nombre de la pantalla a la que quieres navegar
                        });
                      },
                    },
                  ],
                );
              }}>
              <Layout style={{flexDirection: 'row'}}>
                <Text>
                  <MyIcon name="log-out-outline" />
                </Text>
              </Layout>
            </TouchableOpacity>
          </Layout>
        </Layout>
        <Layout
          style={{
            height: 1,
            backgroundColor: 'gray',
            width: 'auto',
            marginBottom: 10,
            marginHorizontal: 10,
          }}
        />
        <Drawer
          selectedIndex={new IndexPath(newState.index)}
          onSelect={index =>
            navigation.navigate(newState.routeNames[index.row])
          }>
          <DrawerItem title="Home" />
          {/* <DrawerItem title="Perfil" /> */}
        </Drawer>
      </SafeAreaView>
      <DrawerContentScrollView>
        {/* <Layout style={{}}>
          <Image
            source={require('../../assets/LogoMaroilConnect.png')}
            style={{width: 30, height: 30, marginRight: 10}}
          />
        </Layout> */}

        <Layout>
          {/* <CustomSwitch
            isOn={currentTheme === 'light' ? false : true}
            onChange={() =>
              currentTheme === 'light' ? setTheme('dark') : setTheme('light')
            }
            text="Tema oscuro"
          />  */}
        </Layout>
        {/* <Layout style={{}}>
          <TouchableOpacity
            style={{}}
            onPress={() => navigation.navigate('HomeScreen')}>
            <Layout style={{flexDirection: 'row'}}>
              <Text><Icon name="airplane-outline" size={25} /> </Text>
              <Text style={{}}>Home</Text>
            </Layout>
          </TouchableOpacity>
        </Layout> */}
      </DrawerContentScrollView>
      <Layout
        style={{
          // flexDirection: 'row',
          // marginVertical: 30,
          marginBottom: 20,
          marginHorizontal: 10,
        }}>
        <TouchableOpacity style={{}} onPress={() => {}}>
          <Layout
            style={{
              flexDirection: 'row',
              marginBottom: 10,
            }}>
            <Text>
              <MyIcon name="question-mark-circle-outline" />
            </Text>
            <Layout style={stylesLocal.textSettings}>
              <Text style={stylesLocal.textSettings}> Centro de ayuda</Text>
            </Layout>
          </Layout>
        </TouchableOpacity>
        <TouchableOpacity style={{}} onPress={() => {}}>
          <Layout
            style={{
              flexDirection: 'row',
              // marginBottom: 10,
            }}>
            <Text>
              <MyIcon name="pie-chart-outline" />
            </Text>
            <Layout style={stylesLocal.textSettings}>
              <Text style={stylesLocal.textSettings}> Administracion</Text>
            </Layout>
          </Layout>
        </TouchableOpacity>
        <Layout style={{alignItems: 'flex-start', marginTop: 10}}>
          <Toggle
            style={stylesLocal.toggle}
            status="primary"
            checked={checked}
            onChange={handleChange}>
            {evaProps => (
              <Text category="h2" {...evaProps}>
                Modo oscuro
              </Text>
            )}
          </Toggle>
        </Layout>
      </Layout>
      <Layout
        style={{
          height: 1,
          backgroundColor: 'gray',
          width: 'auto',
          marginBottom: 30,
          marginHorizontal: 10,
        }}
      />
    </Layout>
  );
};

const stylesLocal = StyleSheet.create({
  textSettings: {
    fontSize: 15,
    fontWeight: '500',
    color: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuContainerPerfil: {
    flexDirection: 'row',
    // marginVertical: 30,
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 10,
    // backgroundColor: 'red',
    // width: 100,
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  containerNombrePerfil: {
    marginLeft: 10,
    // alignContent: 'center',
    justifyContent: 'center',
    width: '50%',
  },
  textNombrePerfil: {
    fontSize: 18,
    fontWeight: 'bold',
    // color: 'black',
  },

  textVerPerfil: {
    fontSize: 12,
    // fontWeight: 'bold',
    fontWeight: '500',
    color: 'gray',
    // lineHeight: 30,
  },
  buttonlVerPerfil: {
    // marginTop: 10,
    // marginLeft: 10,
    // alignContent: 'center',
    // justifyContent: 'center',
  },
  buttonOpciones: {
    marginRight: 6,
  },
  toggle: {
    margin: 2,
  },
});
