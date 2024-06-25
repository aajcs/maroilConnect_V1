import {createDrawerNavigator} from '@react-navigation/drawer';
import {Button, Drawer, DrawerItem, IndexPath} from '@ui-kitten/components';
import {MenuAbajoPrincipalNavitation} from './MenuAbajoPrincipalNavitation';
import {MenuStackPostNavigation} from './MenuStackPostNavigation';
import {useAuthStore} from '../store/auth/useAuthStore';
import {initSockets} from '../utils/sockets';

initSockets();

const {Navigator, Screen} = createDrawerNavigator();

const DrawerContent = ({navigation, state}: {navigation: any; state: any}) => {
  const {logout} = useAuthStore();
  return (
    <Drawer
      selectedIndex={new IndexPath(state.index)}
      onSelect={index => navigation.navigate(state.routeNames[index.row])}>
      <DrawerItem title="Users" />
      <DrawerItem title="Orders" />
      <DrawerItem
        title={() => <Button onPress={logout}>Cerrar secion</Button>}
      />
    </Drawer>
  );
};

export const MenuLateralPrincipalNavitagion = () => {
  return (
    <Navigator
      drawerContent={DrawerContent}
      screenOptions={{
        headerShown: true,

        headerTitle: 'Maroil Connect',
      }}>
      <Screen name="Users" component={MenuAbajoPrincipalNavitation} />
      <Screen name="pantallas" component={MenuStackPostNavigation} />
    </Navigator>
  );
};
