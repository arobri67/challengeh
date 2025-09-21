import { Modal, TouchableOpacity, View } from 'react-native';
import { Text } from './ui/text';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useState } from 'react';

export default function DrawerModal() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View className="flex-1 bg-black/50">
          <TouchableOpacity className="flex-1" onPress={() => setModalVisible(false)} />
          <View className="h-[50%] rounded-t-lg bg-white px-4 pb-8 pt-4">
            <TouchableOpacity onPress={() => setModalVisible(false)} className="mx-auto mb-4">
              <View className="h-1 w-12 rounded-full bg-gray-300" />
            </TouchableOpacity>
            <View className="mb-5 flex-row items-center justify-between">
              <Text className="text-xl font-bold">Add document</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text className="text-gray-500">✕</Text>
              </TouchableOpacity>
            </View>

            <Text className="mb-5 font-semibold">Documents informations</Text>
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
              <Button variant="outline" className="flex-1" onPress={() => setModalVisible(false)}>
                <Text className="font-semibold">Cancel</Text>
              </Button>
              <Button className="flex-1 bg-blue-500">
                <Text className="font-semibold">Submit</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
      <Button className="bg-blue-500" onPress={() => setModalVisible(true)}>
        <Text className="font-semibold">+ Add document</Text>
      </Button>
    </>
  );
}
