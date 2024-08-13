import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  Button,
  Drawer,
  DrawerItem,
  IndexPath,
  Layout,
  Text,
} from '@ui-kitten/components';
import {MenuAbajoPrincipalNavitation} from './MenuAbajoPrincipalNavitation';
import {MenuStackPostNavigation} from './MenuStackPostNavigation';
import {useAuthStore} from '../store/auth/useAuthStore';
import {initSockets} from '../utils/sockets';
import {PerfilUsuarioScreen} from '../screens/PerfilUsuarioScreen';
import {MyIcon} from '../components/iu/MyIcon';
import {ChatScreen} from '../screens/ChatScreen';
import {MenuStackChatUnicoNavigation} from './MenuStackChatUnicoNavigation';
import {Image, SafeAreaView} from 'react-native';

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

export const MenuLateralPrincipalNavitagion = () => {
  const {user} = useAuthStore();
  const userId = user?.id;
  return (
    <Navigator
      drawerContent={DrawerContent}
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
      <Screen name="pantallas" component={MenuStackPostNavigation} />
      <Screen name="chatUnico" component={MenuStackChatUnicoNavigation} />
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
