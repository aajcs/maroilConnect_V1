import {PropsWithChildren, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useAuthStore} from '../store/auth/useAuthStore';
import {RootStackParams} from '../navigations/MenuPrincipalNavigator';

export const AuthProvider = ({children}: PropsWithChildren) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const {checkStatus, status} = useAuthStore();

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  // useEffect(() => {
  //   if (status !== 'checking') {
  //     if (status === 'authenticated') {
  //       navigation.reset({
  //         index: 0,
  //         routes: [{name: 'HomeScreen'}],
  //       });
  //     } else {
  //       navigation.reset({
  //         index: 0,
  //         routes: [{name: 'LoginScreen'}],
  //       });
  //     }
  //   }
  // }, [status, navigation]);

  return <>{children}</>;
};
