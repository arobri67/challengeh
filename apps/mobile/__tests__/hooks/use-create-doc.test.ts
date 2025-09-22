import { ReactNode } from 'react';
import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react-native';

import api from '@/api/client';
import { useCreateDocument } from '@/hooks/use-create-doc';
import { CreateDocumentFormData } from '@/schema/document-schema';
import { DocItems } from '@/types';

jest.mock('@/api/client');

const mockedApi = api as jest.Mocked<typeof api>;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useCreateDocument', () => {
  const mockFormData: CreateDocumentFormData = {
    name: 'Test Document',
    version: '1.0.0',
    file: {
      name: 'test-file.pdf',
      uri: 'file://test.pdf',
      type: 'application/pdf',
    },
  };

  const mockApiResponse: DocItems = {
    ID: 'api-generated-id',
    Title: 'Test Document',
    Version: '1.0.0',
    Attachments: ['test-file.pdf'],
    Contributors: [{ ID: 'api-user-id', Name: 'API User' }],
    CreatedAt: '2024-01-01T10:00:00.000Z',
    UpdatedAt: '2024-01-01T10:00:00.000Z',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return mutation object with correct properties', () => {
    const wrapper = createWrapper();
    const { result } = renderHook(() => useCreateDocument(), { wrapper });

    expect(result.current.mutate).toBeDefined();
    expect(result.current.mutateAsync).toBeDefined();
    expect(result.current.isError).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isPending).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.data).toBeUndefined();
  });

  it('should return temporary document when API call fails', async () => {
    const apiError = new Error('Network error');
    mockedApi.createDoc.mockRejectedValueOnce(apiError);

    const wrapper = createWrapper();
    const { result } = renderHook(() => useCreateDocument(), { wrapper });

    result.current.mutate(mockFormData);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockedApi.createDoc).toHaveBeenCalledWith(mockFormData);
    expect(result.current.data).toMatchObject({
      Title: mockFormData.name,
      Version: mockFormData.version,
      Attachments: [mockFormData.file!.name],
      Contributors: [{ ID: 'current-user', Name: 'Arnaud' }],
    });
    expect(result.current.data?.ID).toMatch(/^temp-\d+$/);
  });

  it('should update query cache on successful creation', async () => {
    mockedApi.createDoc.mockResolvedValueOnce(mockApiResponse);

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });

    const existingDocs: DocItems[] = [
      {
        ID: 'existing-doc',
        Title: 'Existing Document',
        Version: '1.0.0',
        Attachments: [],
        Contributors: [],
        CreatedAt: '2024-01-01T09:00:00.000Z',
        UpdatedAt: '2024-01-01T09:00:00.000Z',
      },
    ];
    queryClient.setQueryData(['documents'], existingDocs);

    const wrapper = ({ children }: { children: ReactNode }) =>
      React.createElement(QueryClientProvider, { client: queryClient }, children);

    const { result } = renderHook(() => useCreateDocument(), { wrapper });

    result.current.mutate(mockFormData);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    const updatedData = queryClient.getQueryData(['documents']) as DocItems[];
    expect(updatedData).toHaveLength(2);
    expect(updatedData[0]).toEqual(mockApiResponse);
    expect(updatedData[1]).toEqual(existingDocs[0]);
  });
});
