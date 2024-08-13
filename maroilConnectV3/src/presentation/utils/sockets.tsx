import io, {Socket} from 'socket.io-client';
import {API_URL} from '../../config/api/maroilApi';
import {Platform} from 'react-native';

export let socket: Socket | null = null;

export const initSockets = (): void => {
  Platform.OS === 'ios'
    ? (socket = io('https://apimaroil.herokuapp.com'))
    : (socket = io('https://apimaroil.herokuapp.com'));
  // ?  (socket = io('http://localhost:4000'))
  // : (socket = io('http://10.10.10.137:4000'));

  console.log('api url', API_URL);
};
