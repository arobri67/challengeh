import { ReactNode, useState } from 'react';

import { Modal, TouchableOpacity, View } from 'react-native';

import { Text } from './ui/text';

interface DrawerModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function DrawerModal({ visible, onClose, title, children }: DrawerModalProps) {
  return (
    <>
      <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
        <View className="flex-1 bg-black/50">
          <TouchableOpacity className="flex-1" onPress={onClose} />
          <View className="h-[50%] rounded-t-lg bg-white px-4 pb-8 pt-4">
            <TouchableOpacity onPress={onClose} className="mx-auto mb-4">
              <View className="h-1 w-12 rounded-full bg-gray-300" />
            </TouchableOpacity>
            <View className="mb-5 flex-row items-center justify-between">
              <Text className="text-xl font-bold">{title}</Text>
              <TouchableOpacity onPress={onClose}>
                <Text className="text-gray-500">✕</Text>
              </TouchableOpacity>
            </View>
            {children}
          </View>
        </View>
      </Modal>
    </>
  );
}
