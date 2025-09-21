import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { Text } from './ui/text';

export default function LoadingState() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white">
        <Text className="h-full text-center">Loading documents...</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
