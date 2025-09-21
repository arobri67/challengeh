import { FlatList, View } from 'react-native';
import { Text } from '../ui/text';
import { Bell } from 'lucide-react-native';
import { NotificationMessage } from '@/types';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import DrawerModal from '../drawer';
import { useState } from 'react';
import { formatRelativeDate } from '@/lib/utils';

interface DocumentHeaderProps {
  unreadCount: number;
  notifications: NotificationMessage[];
  markAsRead: () => void;
}

export default function DocumentHeader({
  unreadCount,
  notifications,
  markAsRead,
}: DocumentHeaderProps) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View className="bg-white">
      <View className="flex-row items-center justify-between px-4 pb-2 pt-4">
        <Text className="text-3xl font-bold text-gray-900">Documents</Text>
        <View className="relative">
          <View className="h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-gray-100">
            <Button variant="outline" size="icon" onPress={() => setModalVisible(true)}>
              <Icon as={Bell} />
            </Button>
          </View>
          {unreadCount > 0 && (
            <View className="absolute -right-1.5 -top-1 h-6 w-7 items-center justify-center rounded-full border border-white bg-blue-500 p-0.5">
              <Text className="text-xs font-semibold text-white">
                {unreadCount > 99 ? '99+' : unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
      <DrawerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Notifications">
        <Button variant="outline" onPress={markAsRead}>
          <Text>Mark as read</Text>
        </Button>
        <View className="flex-1">
          {notifications.length > 0 ? (
            <FlatList
              data={notifications}
              keyExtractor={(item, index) => item.Timestamp}
              renderItem={({ item }) => (
                <View className="border-b border-gray-200 py-3">
                  <Text className="font-medium text-gray-900">
                    {item.DocumentTitle || 'Notification'}
                  </Text>
                  <Text className="mt-1 text-sm text-gray-600">{item.UserName}</Text>
                  {item.Timestamp && (
                    <Text className="mt-1 text-xs text-gray-400">
                      {formatRelativeDate(item.Timestamp)}
                    </Text>
                  )}
                </View>
              )}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View className="flex-1 items-center justify-center">
              <Text className="text-gray-500">No notifications</Text>
            </View>
          )}
        </View>
      </DrawerModal>
    </View>
  );
}
