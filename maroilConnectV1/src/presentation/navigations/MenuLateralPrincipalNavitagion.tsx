import {createDrawerNavigator} from '@react-navigation/drawer';
import {Button, Drawer, DrawerItem, IndexPath} from '@ui-kitten/components';
import {MenuAbajoPrincipalNavitation} from './MenuAbajoPrincipalNavitation';
import {MenuStackPostNavigation} from './MenuStackPostNavigation';
// import {MenuAbajoPrincipalNavitation} from './MenuAbajoPrincipalNavitation';

const {Navigator, Screen} = createDrawerNavigator();

const DrawerContent = ({navigation, state}: {navigation: any; state: any}) => (
  <Drawer
    selectedIndex={new IndexPath(state.index)}
    onSelect={index => navigation.navigate(state.routeNames[index.row])}>
    <DrawerItem title="Users" />
    <DrawerItem title="Orders" />
    <DrawerItem
      title={() => (
        <Button onPress={() => navigation.closeDrawer()}>Cerrar</Button>
      )}
    />
  </Drawer>
);

export const MenuLateralPrincipalNavitagion = () => {
  return (
    <Navigator
      drawerContent={DrawerContent}
      screenOptions={{
        headerShown: true,

        headerTitle: 'Menu Lateral Principal',
      }}>
      <Screen name="Users" component={MenuAbajoPrincipalNavitation} />
      <Screen name="pantallas" component={MenuStackPostNavigation} />
    </Navigator>
  );
};
