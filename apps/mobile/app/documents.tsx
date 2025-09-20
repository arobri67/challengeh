import DocList from '@/components/doc-list';
import DocumentHeader from '@/components/documents/documents-header';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function DocumentsScreen() {
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView className="bg-white">
          <View className="bg-white">
            <DocumentHeader />
            <DocList />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}
