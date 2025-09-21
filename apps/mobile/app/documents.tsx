import api from '@/api/client';
import DocumentsControls from '@/components/documents/documents-controls';
import DocumentHeader from '@/components/documents/documents-header';
import { Text } from '@/components/ui/text';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Alert, FlatList, Modal, RefreshControl, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import DocumentCardList from '@/components/documents/document-card-list';
import DocumentCardGrid from '@/components/documents/document-card-grid';
import { useWebSocket } from '@/hooks/use-websocket';
import { WS_URL } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DrawerModal from '@/components/drawer';
import semver from 'semver';

type ViewMode = 'list' | 'grid';
type SortOption = 'recent' | 'name' | 'version';

export default function Documents() {
  const { unreadCount } = useWebSocket(WS_URL);

  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: docs,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['docs'],
    queryFn: () => api.getDocs(),
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (!docs || !Array.isArray(docs) || docs.length === 0)
    return <Text>📄 No documents to display</Text>;

  const sortedDocs = [...docs].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.UpdatedAt).getTime() - new Date(a.UpdatedAt).getTime();
      case 'name':
        return a.Title.toLowerCase().localeCompare(b.Title.toLowerCase());
      case 'version':
        const vA = semver.clean(a.Version) || '0.0.0';
        const vB = semver.clean(b.Version) || '0.0.0';
        return semver.compare(vB, vA);
      default:
        return 0;
    }
  });

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex-1 bg-slate-50">
            <DocumentHeader unreadCount={unreadCount} />
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

          <View className="border-t-hairline border-slate-400 p-4">
            <DrawerModal />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}
