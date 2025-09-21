import api from '@/api/client';
import { CreateDocumentFormData } from '@/schema/document-schema';
import { DocItems } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const createDocument = async (data: CreateDocumentFormData): Promise<DocItems> => {
  const newDocument: DocItems = {
    ID: `temp-${Date.now()}`,
    Title: data.name,
    Version: data.version,
    Attachments: data.file ? [data.file.name] : [],
    Contributors: [{ ID: 'current-user', Name: 'Current User' }],
    CreatedAt: new Date().toISOString(),
    UpdatedAt: new Date().toISOString(),
  };
  try {
    return await api.createDoc(data);
  } catch (error) {
    console.log('Server creation failed, using optimistic update');
    return newDocument;
  }
};

export const useCreateDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDocument,
    onSuccess: (newDocument) => {
      const currentData = (queryClient.getQueryData(['documents']) as DocItems[]) || [];
      const newData = [newDocument, ...currentData];
      queryClient.setQueryData(['documents'], newData);
    },
    onError: (error) => {
      console.error('Failed to create document:', error);
    },
  });
};
