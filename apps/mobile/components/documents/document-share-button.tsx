import { ShareIcon } from 'lucide-react-native';
import { Share, View } from 'react-native';

import { DocItems } from '@/types';

import { Button } from '../ui/button';
import { Text } from '../ui/text';

interface DocumentCardProps {
  document: DocItems;
}

export default function DocumentShareButton({ document }: DocumentCardProps) {
  const shareDocument = async (document: DocItems) => {
    const shareContent = {
      message: `${document.Title} (v${document.Version})`,
      title: document.Title,
    };

    try {
      await Share.share(shareContent);
    } catch (error) {
      console.error('Error sharing document:', error);
    }
  };
  return (
    <View className="mt-4 flex-row justify-end">
      <Button
        variant="outline"
        size="sm"
        onPress={() => shareDocument(document)}
        className="flex-row items-center gap-2">
        <ShareIcon size={16} className="text-muted-foreground" />
        <Text className="text-sm">Share</Text>
      </Button>
    </View>
  );
}
