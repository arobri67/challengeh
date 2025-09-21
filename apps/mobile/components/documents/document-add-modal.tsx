import { useState } from 'react';

import { View } from 'react-native';

import DocumentAddForm from '@/components/documents/document-add-form';
import DrawerModal from '@/components/drawer';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export default function AddDocumentModal() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="border-t-hairline border-slate-400 p-4">
      <DrawerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Add document">
        <DocumentAddForm onSuccess={() => setModalVisible(false)} />
      </DrawerModal>
      <Button className="bg-blue-500" onPress={() => setModalVisible(true)}>
        <Text className="font-semibold">+ Add document</Text>
      </Button>
    </View>
  );
}
