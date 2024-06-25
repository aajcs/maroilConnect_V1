import io, {Socket} from 'socket.io-client';
import {API_URL} from '../../config/api/maroilApi';
import {Platform} from 'react-native';

export let socket: Socket | null = null;

export const initSockets = (): void => {
  Platform.OS === 'ios'
    ? (socket = io('http://localhost:4000/'))
    : (socket = io('http://172.41.30.80:4000'));

  console.log('api url', API_URL);
};
