import { FlatList, View } from 'react-native';

import { formatRelativeDate } from '@/lib/utils';
import { NotificationMessage } from '@/types';

import { Button } from '../ui/button';
import { Text } from '../ui/text';

interface DocumentHeaderProps {
  notifications: NotificationMessage[];
  markAsRead: () => void;
}

export default function DocumentNotificationsList({
  notifications,
  markAsRead,
}: DocumentHeaderProps) {
  return (
    <>
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
    </>
  );
}
