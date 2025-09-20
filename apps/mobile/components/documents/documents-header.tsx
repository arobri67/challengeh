import { View } from 'react-native';
import { Text } from '../ui/text';
import { Bell } from 'lucide-react-native';

interface DocumentHeaderProps {
  unreadCount: number;
  onMarkAsRead: () => void;
}

export default function DocumentHeader({ unreadCount }: DocumentHeaderProps) {
  return (
    <View className="bg-white">
      <View className="flex-row items-center justify-between px-4 pb-2 pt-4">
        <Text className="text-3xl font-bold text-gray-900">Documents</Text>
        <View className="relative">
          <View className="h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-gray-100">
            <Bell size={20} />
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
    </View>
  );
}
