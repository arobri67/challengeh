import api from '@/api/client';
import DocumentsControls from '@/components/documents/documents-controls';
import DocumentHeader from '@/components/documents/documents-header';
import { Text } from '@/components/ui/text';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import DocumentCardList from '@/components/documents/document-card-list';
import DocumentCardGrid from '@/components/documents/document-card-grid';
import { useWebSocket } from '@/hooks/use-websocket';
import { WS_URL } from '@/lib/utils';

type ViewMode = 'list' | 'grid';
type SortOption = 'recent' | 'name' | 'version';

export default function Documents() {
  const { notifications, unreadCount, markAsRead } = useWebSocket(WS_URL);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [sortBy, setSortBy] = useState<SortOption>('recent');

  const {
    data: docs,
    isLoading,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ['docs'],
    queryFn: () => api.getDocs(),
  });

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (!docs) return <Text>No documents found</Text>;

  const sortedDocs = [...docs].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.UpdatedAt).getTime() - new Date(a.UpdatedAt).getTime();
      case 'name':
        return a.Title.localeCompare(b.Title);
      case 'version':
        return b.Version.localeCompare(a.Version);
      default:
        return 0;
    }
  });

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex-1 bg-slate-50">
            <DocumentHeader
              unreadCount={unreadCount}
              notifications={notifications}
              onMarkAsRead={markAsRead}
            />
            <DocumentsControls
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
            <FlatList
              className="gap-4 px-4"
              data={sortedDocs}
              renderItem={({ item }) =>
                viewMode === 'list' ? (
                  <DocumentCardList document={item} />
                ) : (
                  <DocumentCardGrid document={item} />
                )
              }
              numColumns={viewMode === 'grid' ? 2 : 1}
              key={viewMode}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              columnWrapperStyle={
                viewMode === 'grid' ? { justifyContent: 'space-between' } : undefined
              }
            />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}
