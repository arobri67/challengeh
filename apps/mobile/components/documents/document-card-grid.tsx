import { View } from 'lucide-react-native';
import { Text } from '../ui/text';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { DocItems } from '@/types/types';

interface DocumentCardGridProps {
  document: DocItems;
}

export default function DocumentCardGrid({ document }: DocumentCardGridProps) {
  return (
    <Card
      className="mb-4 h-[100px] w-[48%] justify-center rounded-sm"
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
      <CardHeader>
        <CardTitle className="truncate" numberOfLines={2}>
          {document.Title}
        </CardTitle>
        <CardDescription className="text-xs">Version {document.Version}</CardDescription>
      </CardHeader>
    </Card>
  );
}
