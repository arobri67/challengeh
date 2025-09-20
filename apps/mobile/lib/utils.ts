import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Platform } from 'react-native';
import { formatDistanceToNow, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BASE_URL =
  Platform.OS === 'android' ? 'http://10.0.2.2:8080' : 'http://localhost:8080';

export const WS_URL =
  Platform.OS === 'android'
    ? 'ws://10.0.2.2:8080/notifications'
    : 'ws://localhost:8080/notifications';

export const formatRelativeDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString); // Parse ISO string
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    return 'Invalid date';
  }
};
