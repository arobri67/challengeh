import api from '@/api/client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { View } from 'react-native';
import { Icon } from './ui/icon';
import { Text } from '@/components/ui/text';
import { Link, UsersRound } from 'lucide-react-native';

export default function DocList() {
  const { data: docs } = useQuery({
    queryKey: ['docs'],
    queryFn: () => api.getDocs(),
  });

  if (!docs) return <Text>No documents found</Text>;
  return (
    <View className="p-3">
      {docs.map((doc) => {
        return (
          <Card
            key={doc.ID}
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
                {doc.Title}
              </CardTitle>
              <CardDescription className="text-xs">Version {doc.Version}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-row gap-10">
              <View>
                <View className="mb-2 flex flex-row items-center gap-2">
                  <Icon as={UsersRound} className="color-zinc-800" />
                  <Text className="text-sm font-semibold">Contributors</Text>
                </View>
                <View className="flex gap-2">
                  {doc.Contributors.map((item) => {
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
                  {doc.Attachments.map((item, index) => {
                    return (
                      <Text key={index + item} className="text-sm text-zinc-600">
                        {item}
                      </Text>
                    );
                  })}
                </View>
              </View>
            </CardContent>
          </Card>
        );
      })}
    </View>
  );
}
