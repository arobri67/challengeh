import api from '@/api/api';
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

  if (!docs) return;
  return (
    <View className="p-3">
      {docs.map((doc) => {
        return (
          <Card key={doc.ID}>
            <CardHeader className="flex flex-row items-center">
              <CardTitle>{doc.Title}</CardTitle>
              <CardDescription>Version {doc.Version}</CardDescription>
            </CardHeader>
            <CardContent className="sp flex flex-row gap-20">
              <View className="flex flex-row items-center gap-2">
                <Icon as={UsersRound} />
                <Text className="text-sm font-semibold">Contributors</Text>
              </View>
              <View className="flex flex-row items-center gap-2">
                <Icon as={Link} />
                <Text className="text-sm font-semibold">Attachments</Text>
              </View>
            </CardContent>
          </Card>
        );
      })}
    </View>
  );
}
