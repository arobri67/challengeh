import { BASE_URL } from '@/lib/utils';
import { CreateDocumentFormData } from '@/schema/document-schema';
import { DocItems, DocsRes } from '@/types';

const api = {
  async getDocs(): Promise<DocsRes | undefined> {
    const res = await fetch(`${BASE_URL}/documents`);
    const data = await res.json();

    return data;
  },
  async createDoc(data: CreateDocumentFormData): Promise<DocItems> {
    const response = await fetch(`${BASE_URL}/documents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create document');
    }
    return await response.json();
  },
};

export default api;
