import { BASE_URL } from '@/lib/utils';
import { DocsRes } from '@/types/types';

const api = {
  async getDocs(): Promise<DocsRes | undefined> {
    const res = await fetch(`${BASE_URL}/documents`);
    const data = await res.json();

    return data;
  },
};

export default api;
