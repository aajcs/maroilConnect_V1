import {create} from 'zustand';
import {
  authCheckStatus,
  authLogin,
  newTokenFcm,
  removeTokenFcm,
} from '../../../actions/auth/auth';
import {AuthStatus} from '../../../infrastructure/interfaces/auth.status';
import {FaidUser} from '../../../domain/entities/user';
import {StorageAdapter} from '../../../config/adapters/storage-adapter';
import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import {
  solicitudPermisoNotificacionesAndroid,
  solicitudPermisoNotificacionesIos,
} from '../../utils/solicitudPermisoNotificaciones';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: FaidUser;
  faidUser?: FaidUser;

  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(set => ({
  status: 'checking',
  token: undefined,
  user: undefined,

  login: async (email: string, password: string) => {
    const resp = await authLogin(email, password);
    if (!resp) {
      set({status: 'unauthenticated', token: undefined, user: undefined});
      return false;
    }
    await StorageAdapter.setItem('token', resp.token);

    const fcmToken = await messaging().getToken();

    await newTokenFcm(fcmToken, resp.user);
    await messaging().subscribeToTopic('allUsers');
    Platform.OS === 'ios'
      ? solicitudPermisoNotificacionesIos()
      : solicitudPermisoNotificacionesAndroid();

    set({status: 'authenticated', token: resp.token, user: resp.user});

    return true;
  },

  checkStatus: async () => {
    const resp = await authCheckStatus();

    if (!resp) {
      set({status: 'unauthenticated', token: undefined, user: undefined});
      return;
    }

    await StorageAdapter.setItem('token', resp.token);
    set({status: 'authenticated', token: resp.token, user: resp.user});
  },

  logout: async () => {
    const fcmToken = await messaging().getToken();
    const {user} = useAuthStore.getState();
    await removeTokenFcm(fcmToken, user);
    await messaging().unsubscribeFromTopic('allUsers');

    await StorageAdapter.removeItem('token');
    set({status: 'unauthenticated', token: undefined, user: undefined});
  },
}));
