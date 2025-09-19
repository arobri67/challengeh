import DocList from '@/components/doc-list';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Screen() {
  return (
    <>
      <SafeAreaView className="bg-white">
        <View className="bg-white">
          <DocList />
        </View>
      </SafeAreaView>
    </>
  );
}
