import { DocItems } from '@/types';
import { View } from 'react-native';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Icon } from '../ui/icon';
import { Link, UsersRound } from 'lucide-react-native';
import { Text } from '../ui/text';

interface DocumentCardProps {
  document: DocItems;
}

export default function DocumentCardList({ document }: DocumentCardProps) {
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
      <CardContent className="flex flex-row gap-10">
        <View>
          <View className="mb-2 flex flex-row items-center gap-2">
            <Icon as={UsersRound} className="color-zinc-800" />
            <Text className="text-sm font-semibold">Contributors</Text>
          </View>
          <View className="flex gap-2">
            {document.Contributors.map((item) => {
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
          <View className="flex gap-2">
            {document.Attachments.map((item, index) => {
              return (
                <Text
                  key={index + item}
                  className="text-sm text-zinc-600"
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {item}
                </Text>
              );
            })}
          </View>
        </View>
      </CardContent>
    </Card>
  );
}
