import { View } from 'react-native';
import { Input } from '../ui/input';
import { Text } from '../ui/text';
import { Button } from '../ui/button';

export default function DocumentAddForm() {
  return (
    <>
      <Text className="mb-1 text-sm font-semibold">Name</Text>
      <Input className="mb-3" placeholder="name" />
      <Text className="mb-1 text-sm font-semibold">Version</Text>
      <Input className="mb-3" placeholder="version" />
      <Text className="mb-1 text-sm font-semibold">File</Text>
      <View className="flex-row">
        <Button variant="outline" className="bg-white">
          <Text className="font-semibold text-blue-500">Choose File</Text>
        </Button>
      </View>
      <View className="mt-auto flex-row gap-3">
        <Button className="flex-1 bg-blue-500">
          <Text className="font-semibold">Submit</Text>
        </Button>
      </View>
    </>
  );
}
