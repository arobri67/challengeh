import { Platform } from 'react-native';

export const BASE_URL =
  Platform.OS === 'android' ? 'http://10.0.2.2:8080' : 'http://localhost:8080';

export const WS_URL =
  Platform.OS === 'android'
    ? 'ws://10.0.2.2:8080/notifications'
    : 'ws://localhost:8080/notifications';
