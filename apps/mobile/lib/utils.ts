import { type ClassValue, clsx } from 'clsx';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Platform } from 'react-native';
import semver from 'semver';
import { twMerge } from 'tailwind-merge';

import { DocItems, SortOption } from '@/types';

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

export const sortDocuments = (docs: DocItems[], sortBy: SortOption): DocItems[] => {
  return [...docs].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.UpdatedAt).getTime() - new Date(a.UpdatedAt).getTime();
      case 'name':
        return a.Title.localeCompare(b.Title, undefined, {
          sensitivity: 'base',
          numeric: true,
        });
      case 'version':
        const vA = semver.clean(a.Version) || '0.0.0';
        const vB = semver.clean(b.Version) || '0.0.0';
        return semver.compare(vB, vA);
      default:
        return 0;
    }
  });
};
