import { formatDistanceToNow } from 'date-fns';
import { Link, ShareIcon, UsersRound } from 'lucide-react-native';
import { Share } from 'react-native';
import { View } from 'react-native';

import { formatRelativeDate } from '@/lib/utils';
import { DocItems } from '@/types';

import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Icon } from '../ui/icon';
import { Text } from '../ui/text';

interface DocumentCardProps {
  document: DocItems;
}

export default function DocumentCardList({ document }: DocumentCardProps) {
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

  if (!document) return null;

  return (
    <Card
      className="mb-5 gap-4 rounded-sm"
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
      <CardHeader className="flex flex-row items-center">
        <CardTitle className="max-w-[60%] truncate" numberOfLines={1}>
          {document.Title}
        </CardTitle>
        <CardDescription className="text-xs">Version {document.Version}</CardDescription>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-5 text-xs">
          Last update {formatRelativeDate(document.UpdatedAt)}
        </CardDescription>
        <View className="flex flex-row gap-8">
          <View>
            <View className="mb-2 flex flex-row items-center gap-2">
              <Icon as={UsersRound} className="color-zinc-800" />
              <Text className="text-sm font-semibold">Contributors</Text>
            </View>
            <View className="flex gap-2">
              {document.Contributors?.map((item) => {
                return (
                  <Text key={item.ID} className="text-sm text-zinc-600">
                    {item.Name}
                  </Text>
                );
              })}
            </View>
          </View>
          <View>
            <View className="mb-2 flex flex-row items-center gap-2">
              <Icon as={Link} className="color-zinc-800" />
              <Text className="text-sm font-semibold">Attachments</Text>
            </View>
            <View className="flex flex-col gap-2">
              {document.Attachments?.map((item, index) => {
                return (
                  <Text
                    key={index + item}
                    className="max-w-[100%] text-sm text-zinc-600"
                    numberOfLines={2}
                    ellipsizeMode="tail">
                    {item}
                  </Text>
                );
              })}
            </View>
          </View>
        </View>
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
      </CardContent>
    </Card>
  );
}
