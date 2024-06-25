import {
  StackCardStyleInterpolator,
  createStackNavigator,
} from '@react-navigation/stack';
import {HomeScreen} from '../screens/HomeScreen';
import {LoadingScreen} from '../screens/LoadingScreen';
import {LoginScreen} from '../screens/LoginScreen';
import {RegisterScreen} from '../screens/RegisterScreen';
import {useAuthStore} from '../store/auth/useAuthStore';
import {MenuLateralPrincipalNavitagion} from './MenuLateralPrincipalNavitagion';
// import {PublicarScreen} from '../screens/PublicarScreen';

export type RootStackParams = {
  LoadingScreen: undefined;
  LoginScreen: undefined;
  MenuPrincipal: undefined;
  RegisterScreen: undefined;
  HomeScreen: undefined;
  NotificationsScreen: undefined;
  ProfileScreen: undefined;
  SettingsScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

const fadeAnimation: StackCardStyleInterpolator = ({current}) => {
  return {
    cardStyle: {
      opacity: current.progress,
    },
  };
};
const VistasUsuarioLogueado = () => {
  return <MenuLateralPrincipalNavitagion />;
};

const VistaUsuarioNoLogueado = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoadingScreen"
      screenOptions={{
        headerShown: false,
        // cardStyleInterpolator: fadeAnimation,
      }}>
      <Stack.Screen
        options={{cardStyleInterpolator: fadeAnimation}}
        name="LoadingScreen"
        component={LoadingScreen}
      />
      <Stack.Screen
        options={{cardStyleInterpolator: fadeAnimation}}
        name="LoginScreen"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{cardStyleInterpolator: fadeAnimation}}
        name="RegisterScreen"
        component={RegisterScreen}
      />
      <Stack.Screen
        options={{cardStyleInterpolator: fadeAnimation}}
        name="HomeScreen"
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
};
const RootNavigator = () => {
  const {status} = useAuthStore();

  if (status === 'checking') {
    return <LoadingScreen />;
  }

  return (
    <>
      {status === 'authenticated' ? (
        <VistasUsuarioLogueado />
      ) : (
        <VistaUsuarioNoLogueado />
      )}
    </>
  );
};
export const MenuPrincipalNavigator = () => {
  return <RootNavigator />;
};
