import api from '@/api/client';
import DocList from '@/components/doc-list';
import DocumentCard from '@/components/documents/document-card-list';
import DocumentGrid from '@/components/documents/document-card-grid';
import DocumentsControls from '@/components/documents/documents-controls';
import DocumentHeader from '@/components/documents/documents-header';
import { Text } from '@/components/ui/text';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import DocumentCardList from '@/components/documents/document-card-list';
import DocumentCardGrid from '@/components/documents/document-card-grid';

type ViewMode = 'list' | 'grid';
type SortOption = 'recent' | 'name' | 'version';

export default function DocumentsScreen() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [sortBy, setSortBy] = useState<SortOption>('recent');

  const {
    data: docs,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['docs'],
    queryFn: () => api.getDocs(),
  });

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
        <SafeAreaView className="bg-white">
          <View className="bg-white">
            <DocumentHeader />
            <DocumentsControls
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
            <FlatList
              data={sortedDocs}
              renderItem={}
              renderItem={({ item }) =>
                viewMode === 'list' ? <DocumentCardList /> : <DocumentCardGrid />
              }
              numColumns={viewMode === 'grid' ? 2 : 1}
              key={viewMode}
            />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}
