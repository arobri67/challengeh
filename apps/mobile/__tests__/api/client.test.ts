import api from '@/api/client';
import { CreateDocumentFormData } from '@/schema/document-schema';
import { DocItems, DocsRes } from '@/types';

// Create a type for our partial Response mock
type MockResponse = Partial<Response> & {
  ok: boolean;
  json: () => Promise<any>;
};

global.fetch = jest.fn();

jest.mock('@/lib/utils', () => ({
  BASE_URL: 'http://localhost:3000',
}));

const mockedFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('API Client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getDocs', () => {
    it('should fetch documents successfully', async () => {
      const mockResponse: DocsRes = [
        {
          ID: '1',
          Title: 'Test Document',
          Version: '1.0.0',
          Attachments: ['file1.pdf'],
          Contributors: [{ ID: 'user1', Name: 'John Doe' }],
          CreatedAt: '2024-01-01T10:00:00Z',
          UpdatedAt: '2024-01-01T10:00:00Z',
        },
        {
          ID: '2',
          Title: 'Another Document',
          Version: '2.0.0',
          Attachments: [],
          Contributors: [{ ID: 'user2', Name: 'Jane Smith' }],
          CreatedAt: '2024-01-02T10:00:00Z',
          UpdatedAt: '2024-01-02T10:00:00Z',
        },
      ];

      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as MockResponse as Response);

      const result = await api.getDocs();

      expect(mockedFetch).toHaveBeenCalledWith('http://localhost:3000/documents');
      expect(result).toEqual(mockResponse);
    });

    it('should handle empty documents response', async () => {
      const mockResponse: DocsRes = [];

      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as MockResponse as Response);

      const result = await api.getDocs();

      expect(result).toEqual([]);
    });

    it('should handle network errors', async () => {
      mockedFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(api.getDocs()).rejects.toThrow('Network error');
    });
  });

  describe('createDoc', () => {
    it('should create document successfully', async () => {
      const formData: CreateDocumentFormData = {
        name: 'New Document',
        version: '1.0.0',
        file: {
          uri: 'file://test.pdf',
          name: 'test.pdf',
          type: 'application/pdf',
        },
      };

      const mockResponse: DocItems = {
        ID: 'new-123',
        Title: 'New Document',
        Version: '1.0.0',
        Attachments: ['test.pdf'],
        Contributors: [{ ID: 'user1', Name: 'Current User' }],
        CreatedAt: '2024-01-01T10:00:00Z',
        UpdatedAt: '2024-01-01T10:00:00Z',
      };

      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as MockResponse as Response);

      const result = await api.createDoc(formData);

      expect(mockedFetch).toHaveBeenCalledWith('http://localhost:3000/new-documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle network errors during creation', async () => {
      const formData: CreateDocumentFormData = {
        name: 'Network Error Document',
        version: '1.0.0',
        file: {
          uri: 'file://test.pdf',
          name: 'test.pdf',
          type: 'application/pdf',
        },
      };

      mockedFetch.mockRejectedValueOnce(new Error('Network failure'));

      await expect(api.createDoc(formData)).rejects.toThrow('Network failure');
    });

    it('should handle invalid JSON in response', async () => {
      const formData: CreateDocumentFormData = {
        name: 'JSON Error Document',
        version: '1.0.0',
        file: {
          uri: 'file://test.pdf',
          name: 'test.pdf',
          type: 'application/pdf',
        },
      };

      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error('Invalid JSON response');
        },
      } as MockResponse as Response);

      await expect(api.createDoc(formData)).rejects.toThrow('Invalid JSON response');
    });
  });
});
