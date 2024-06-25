import axios from 'axios';
import {Platform} from 'react-native';
import {StorageAdapter} from '../adapters/storage-adapter';

const STAGE = 'prod';

const PROD_URL = 'https://apimaroil.herokuapp.com/api';
const API_URL_IOS = 'http://localhost:4000/api';
const API_URL_ANDROID = 'http://172.41.30.80:4000/api';

export const API_URL =
  STAGE !== 'prod'
    ? PROD_URL
    : Platform.OS === 'ios'
    ? API_URL_IOS
    : API_URL_ANDROID;
const maroilApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

maroilApi.interceptors.request.use(async config => {
  const token = await StorageAdapter.getItem('token');

  if (token) {
    // config.headers['Authorization'] = `Bearer ${token}`;
    // config.headers = config.headers || {};
    config.headers.Authorization = token;
  } else {
    config.headers.Authorization =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGZlODZjMGNmOTE3YzY1OWE0NmU2MCIsImlhdCI6MTcxMDQ1Mzc2MH0.Mr3yZK-ZrHufIppPgiMUdETMHTTOq5dDsirJ1uWyq11';
  }

  return config;
});

export {maroilApi};
