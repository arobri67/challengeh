import { PortalHost } from '@rn-primitives/portal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';

export { ErrorBoundary } from 'expo-router';
import '@/global.css';

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <PortalHost />
      <Stack
        screenOptions={{
          headerShown: false,
        }}></Stack>
    </QueryClientProvider>
  );
}
