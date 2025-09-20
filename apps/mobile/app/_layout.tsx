import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';

export { ErrorBoundary } from 'expo-router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="documents" options={{ headerShown: false }} />
        {/* <Stack.Screen
          name="create-document"
          options={{
            presentation: 'modal',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="document/[id]"
          options={{
            headerShown: false,
          }}
        /> */}
      </Stack>
    </QueryClientProvider>
  );
}
