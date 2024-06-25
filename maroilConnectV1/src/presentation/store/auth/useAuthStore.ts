import {create} from 'zustand';
import {authCheckStatus, authLogin} from '../../../actions/auth/auth';
import {AuthStatus} from '../../../infrastructure/interfaces/auth.status';
import {FaidUser} from '../../../domain/entities/user';
import {StorageAdapter} from '../../../config/adapters/storage-adapter';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: FaidUser;

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
    await StorageAdapter.removeItem('token');
    set({status: 'unauthenticated', token: undefined, user: undefined});
  },
}));