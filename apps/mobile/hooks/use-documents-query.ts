import { useQuery } from '@tanstack/react-query';

import api from '@/api/client';

export const useDocumentsQuery = () => {
  return useQuery({
    queryKey: ['documents'],
    queryFn: () => api.getDocs(),
    staleTime: 5 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    retry: (failureCount, error) => {
      if (error?.message?.includes('Network')) return false;
      return failureCount < 3;
    },
  });
};
