import { Modal, TouchableOpacity, View } from 'react-native';
import { Text } from './ui/text';
import { Button } from './ui/button';
import { ReactNode, useState } from 'react';

interface DrawerModalProps {
  children: ReactNode;
}

export default function DrawerModal({ children }: DrawerModalProps) {
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
        {/* blurry part */}
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
            {/* title */}
            <Text className="mb-5 font-semibold">Documents informations</Text>
            {/* form */}
            {children}
            {/* form end */}
          </View>
        </View>
      </Modal>
      <Button className="bg-blue-500" onPress={() => setModalVisible(true)}>
        <Text className="font-semibold">+ Add document</Text>
      </Button>
    </>
  );
}
