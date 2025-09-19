import { DocsRes } from '@/types/types';

const BASE_URL = 'http://localhost:8080';

const api = {
  async getDocs(): Promise<DocsRes | undefined> {
    const res = await fetch(`${BASE_URL}/documents`);
    const data = await res.json();

    return data;
  },
};

export default api;
