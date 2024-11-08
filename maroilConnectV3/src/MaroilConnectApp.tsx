import 'react-native-gesture-handler';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {NavigationContainer} from '@react-navigation/native';
import {MenuPrincipalNavigator} from './presentation/navigations/MenuPrincipalNavigator';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {AuthProvider} from './presentation/providers/AuthProvider';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';
import {useConfigStore} from './presentation/store/iu/useConfigStore';

const queryClient = new QueryClient();
const lightTheme = {
  ...eva.light,
  'color-primary-500': '#002885',
};

const darkTheme = {
  ...eva.dark,
  // 'color-primary-500': '#002885',

  'color-basic-800': '#3d3d3d',
  'color-basic-900': '#202020',
};

export const MaroilConnectApp = () => {
  const {checked} = useConfigStore();

  const theme = checked ? darkTheme : lightTheme;

  const backgroundColor = checked
    ? theme['color-basic-800']
    : theme['color-basic-100'];
  const textColor = checked
    ? theme['color-basic-100']
    : theme['color-basic-800'];

  return (
    <QueryClientProvider client={queryClient}>
      <IconRegistry icons={EvaIconsPack} />

      <ApplicationProvider {...eva} theme={theme}>
        <NavigationContainer
          theme={{
            dark: checked,
            colors: {
              primary: theme['color-primary-500'],
              background: backgroundColor,
              card: backgroundColor,
              text: textColor,
              border: backgroundColor,
              notification: theme['color-primary-500'],
            },
          }}>
          <AuthProvider>
            <MenuPrincipalNavigator />
          </AuthProvider>
        </NavigationContainer>
      </ApplicationProvider>
      <Toast />
    </QueryClientProvider>
  );
};
