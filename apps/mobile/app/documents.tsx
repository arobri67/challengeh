import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { FlatList, RefreshControl, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import api from '@/api/client';
import AddDocumentModal from '@/components/documents/document-add-modal';
import DocumentCardGrid from '@/components/documents/document-card-grid';
import DocumentCardList from '@/components/documents/document-card-list';
import DocumentsControls from '@/components/documents/documents-controls';
import DocumentHeader from '@/components/documents/documents-header';
import EmptyState from '@/components/empty-state';
import LoadingState from '@/components/loading-state';
import { useWebSocket } from '@/hooks/use-websocket';
import { WS_URL, sortDocuments } from '@/lib/utils';
import { DocItems, SortOption, ViewMode } from '@/types';

export default function Documents() {
  const { unreadCount, notifications, markAsRead } = useWebSocket(WS_URL);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: documents,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['documents'],
    queryFn: () => api.getDocs(),
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (isLoading) return <LoadingState />;

  if (!documents || !Array.isArray(documents) || documents.length === 0) return <EmptyState />;

  const sortedDocs = sortDocuments(documents, sortBy);

  const renderItem = ({ item }: { item: DocItems }) =>
    viewMode === 'list' ? (
      <DocumentCardList document={item} />
    ) : (
      <DocumentCardGrid document={item} />
    );

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex-1 bg-gray-100">
            <DocumentHeader
              unreadCount={unreadCount}
              notifications={notifications}
              markAsRead={markAsRead}
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
              renderItem={renderItem}
              numColumns={viewMode === 'grid' ? 2 : 1}
              key={viewMode}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              columnWrapperStyle={
                viewMode === 'grid' ? { justifyContent: 'space-between' } : undefined
              }
            />
          </View>
          <AddDocumentModal />
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}
