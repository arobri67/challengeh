import { act, renderHook, waitFor } from '@testing-library/react-native';

import { useWebSocket } from '@/hooks/use-websocket';
import { NotificationMessage } from '@/types';

class MockWebSocket {
  onopen: ((event: Event) => void) | null = null;
  onclose: ((event: CloseEvent) => void) | null = null;
  onmessage: ((event: MessageEvent) => void) | null = null;
  onerror: ((event: Event) => void) | null = null;
  readyState: number = 0;

  close = jest.fn();
  send = jest.fn();

  constructor() {
    this.readyState = 0;
  }

  simulateOpen() {
    this.readyState = 1;
    if (this.onopen) {
      this.onopen(new Event('open'));
    }
  }

  simulateMessage(data: any) {
    if (this.onmessage) {
      this.onmessage(new MessageEvent('message', { data: JSON.stringify(data) }));
    }
  }
}

const notification1: NotificationMessage = {
  Timestamp: '2020-08-12T07:30:08.28093+02:00',
  UserID: '3ffe27e5-fe2c-45ea-8b3c-879b757b0455',
  UserName: 'Alicia Wolf',
  DocumentID: 'f09acc46-3875-4eff-8831-10ccf3356420',
  DocumentTitle: 'Edmund Fitzgerald Porter',
};

const notification2: NotificationMessage = {
  Timestamp: '2020-08-12T07:30:08.281305+02:00',
  UserID: 'fd525a6d-1255-4427-91fa-86af21e805d3',
  UserName: 'Cindy Weissnat',
  DocumentID: '8d9b79cc-a48c-4f62-b385-607feb4276b8',
  DocumentTitle: 'Schneider Aventinus',
};

const MockWebSocketConstructor = jest.fn().mockImplementation(() => new MockWebSocket());
global.WebSocket = MockWebSocketConstructor as unknown as typeof WebSocket;

describe('useWebSocket', () => {
  let mockWebSocket: MockWebSocket;
  const testUrl = 'ws://localhost:3001';

  beforeEach(() => {
    jest.clearAllMocks();
    mockWebSocket = new MockWebSocket();
    MockWebSocketConstructor.mockReturnValue(mockWebSocket);
  });

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useWebSocket(testUrl));

    expect(result.current.notifications).toEqual([]);
    expect(result.current.isConnected).toBe(false);
    expect(result.current.unreadCount).toBe(0);
    expect(typeof result.current.markAsRead).toBe('function');
  });

  it('should connect to WebSocket on mount', () => {
    renderHook(() => useWebSocket(testUrl));

    expect(MockWebSocketConstructor).toHaveBeenCalledWith(testUrl);
  });

  it('should set connected state when WebSocket opens', async () => {
    const { result } = renderHook(() => useWebSocket(testUrl));

    act(() => {
      mockWebSocket.simulateOpen();
    });

    await waitFor(() => {
      expect(result.current.isConnected).toBe(true);
    });
  });

  it('should handle incoming notifications', async () => {
    const { result } = renderHook(() => useWebSocket(testUrl));

    act(() => {
      mockWebSocket.simulateMessage(notification1);
    });

    await waitFor(() => {
      expect(result.current.notifications).toHaveLength(1);
      expect(result.current.notifications[0]).toEqual(notification1);
      expect(result.current.unreadCount).toBe(1);
    });
  });

  it('should handle multiple notifications', async () => {
    const { result } = renderHook(() => useWebSocket(testUrl));

    act(() => {
      mockWebSocket.simulateMessage(notification1);
    });

    act(() => {
      mockWebSocket.simulateMessage(notification2);
    });

    await waitFor(() => {
      expect(result.current.notifications).toHaveLength(2);
      expect(result.current.notifications[0]).toEqual(notification2);
      expect(result.current.notifications[1]).toEqual(notification1);
      expect(result.current.unreadCount).toBe(2);
    });
  });

  it('should mark notifications as read', async () => {
    const { result } = renderHook(() => useWebSocket(testUrl));

    act(() => {
      mockWebSocket.simulateMessage(notification1);
    });

    await waitFor(() => {
      expect(result.current.unreadCount).toBe(1);
    });

    act(() => {
      result.current.markAsRead();
    });

    expect(result.current.unreadCount).toBe(0);
    expect(result.current.notifications).toHaveLength(1);
  });

  it('should handle multiple mark as read calls', async () => {
    const { result } = renderHook(() => useWebSocket(testUrl));

    act(() => {
      mockWebSocket.simulateMessage(notification1);
    });

    await waitFor(() => {
      expect(result.current.unreadCount).toBe(1);
    });

    act(() => {
      result.current.markAsRead();
    });

    act(() => {
      result.current.markAsRead();
    });

    expect(result.current.unreadCount).toBe(0);
  });
});
