import { ReactNode } from 'react';
import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react-native';

import api from '@/api/client';
import { DocItems } from '@/types';

import { useDocumentsQuery } from '../../hooks/use-documents-query';

jest.mock('@/api/client');

const mockApi = api as jest.Mocked<typeof api>;

let queryClient: QueryClient;

const createWrapper = () => {
  queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
        staleTime: 0,
      },
    },
  });

  return ({ children }: { children: ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useDocumentsQuery', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    queryClient?.clear();
  });

  afterAll(() => {
    queryClient?.getQueryCache().clear();
    queryClient?.getMutationCache().clear();
  });

  it('should call api.getDocs when query is executed', () => {
    mockApi.getDocs.mockResolvedValue([]);

    renderHook(() => useDocumentsQuery(), {
      wrapper: createWrapper(),
    });

    expect(mockApi.getDocs).toHaveBeenCalledTimes(1);
  });

  it('should return loading state initially', () => {
    mockApi.getDocs.mockImplementation(() => new Promise(() => {}));

    const { result } = renderHook(() => useDocumentsQuery(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it('should return query result with correct structure', async () => {
    const mockData: DocItems[] = [
      {
        ID: '69517c79-a4b2-4f64-9c83-20e5678e4519',
        Title: 'Test Document',
        Version: '1.0.0',
        Attachments: ['test-file.pdf'],
        Contributors: [
          {
            ID: '1b41861e-51e2-4bf4-ba13-b20f01ce81ef',
            Name: 'Test User',
          },
        ],
        CreatedAt: '2024-01-01T10:00:00.000Z',
        UpdatedAt: '2024-01-01T10:00:00.000Z',
      },
    ];
    mockApi.getDocs.mockResolvedValue(mockData);

    const { result } = renderHook(() => useDocumentsQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockData);
    });
  });

  it('should handle API error', async () => {
    const mockError = new Error('Failed to fetch documents');
    mockApi.getDocs.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useDocumentsQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(mockError);
    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
  });

  it('should use correct query key', async () => {
    const mockDocuments: DocItems[] = [
      {
        ID: '69517c79-a4b2-4f64-9c83-20e5678e4519',
        Title: 'Test Document',
        Version: '1.0.0',
        Attachments: ['test-file.pdf'],
        Contributors: [
          {
            ID: '1b41861e-51e2-4bf4-ba13-b20f01ce81ef',
            Name: 'Test User',
          },
        ],
        CreatedAt: '2024-01-01T10:00:00.000Z',
        UpdatedAt: '2024-01-01T10:00:00.000Z',
      },
    ];
    mockApi.getDocs.mockResolvedValueOnce(mockDocuments);

    renderHook(() => useDocumentsQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(queryClient.getQueryData(['documents'])).toEqual(mockDocuments);
    });

    const queryKeys = queryClient
      .getQueryCache()
      .getAll()
      .map((query) => query.queryKey);
    expect(queryKeys).toContainEqual(['documents']);
  });
});
