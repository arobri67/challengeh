import { useQuery } from '@tanstack/react-query';

import api from '@/api/client';

export const useDocumentsQuery = () => {
  return useQuery({
    queryKey: ['documents'],
    queryFn: () => api.getDocs(),
  });
};
