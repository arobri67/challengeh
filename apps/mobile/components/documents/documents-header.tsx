import { View } from 'react-native';
import { Text } from '../ui/text';
import { Bell } from 'lucide-react-native';
import { NotificationMessage } from '@/types';

interface DocumentHeaderProps {
  unreadCount: number;
  notifications: NotificationMessage[];
  onMarkAsRead: () => void;
}

export default function DocumentHeader({
  unreadCount,
  notifications,
  onMarkAsRead,
}: DocumentHeaderProps) {
  return (
    <View className="bg-white">
      <View className="flex-row items-center justify-between px-4 pb-2 pt-4">
        <Text className="text-3xl font-bold text-gray-900">Documents</Text>
        {/* notifications are hardcoded
        
        */}
        <View className="relative">
          <View className="h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
            <Bell size={20} />
          </View>
          {/* <View className="absolute -right-1 -top-1 h-5 w-5 items-center justify-center rounded-full bg-blue-500">
            <Text className="text-xs font-semibold text-white">1</Text>
          </View> */}
          {unreadCount > 0 && (
            <View className="absolute -right-1 -top-1 h-5 w-5 items-center justify-center rounded-full bg-blue-500">
              <Text className="text-xs font-semibold text-white">
                {unreadCount > 99 ? '99+' : unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
