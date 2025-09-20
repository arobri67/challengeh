import { Pressable, View } from 'react-native';
import { Text } from '../ui/text';
import { ChevronDown, ChevronsUpDown, Grid3X3, List } from 'lucide-react-native';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Icon } from '../ui/icon';

interface DocumentsHeaderProps {
  sortBy: 'recent' | 'name' | 'version';
  onSortChange: (sort: 'recent' | 'name' | 'version') => void;
  viewMode: 'list' | 'grid';
  onViewModeChange: (mode: 'list' | 'grid') => void;
}

const sortOptions = [
  { value: 'recent', label: 'Most recent' },
  { value: 'name', label: 'By name' },
  { value: 'version', label: 'By version' },
];

export default function DocumentsControls({
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}: DocumentsHeaderProps) {
  const selectedOption = sortOptions.find((option) => option.value === sortBy);

  const handleValueChange = (option: { value: string; label: string } | undefined) => {
    if (option) {
      onSortChange(option.value as 'recent' | 'name' | 'version');
    }
  };

  return (
    <View className="flex-row items-center justify-between px-4 pb-4">
      {/* Sort by dropdown */}

      <Select value={selectedOption} onValueChange={handleValueChange}>
        <SelectTrigger>
          <Icon as={ChevronsUpDown} />
          <SelectValue placeholder="Sort by" className="font-semibold text-black" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort by</SelectLabel>
            {sortOptions.map((option) => {
              return <SelectItem key={option.value} label={option.label} value={option.value} />;
            })}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* View toggle */}
      {/* <View className="flex-row rounded-lg bg-gray-100 p-1">
        <Pressable
          onPress={() => onViewModeChange('list')}
          className={`rounded-md p-2 ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}>
          <List size={20} color={viewMode === 'list' ? '#3B82F6' : '#6B7280'} />
        </Pressable>
        <Pressable
          onPress={() => onViewModeChange('grid')}
          className={`ml-1 rounded-md p-2 ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}>
          <Grid3X3 size={20} color={viewMode === 'grid' ? '#3B82F6' : '#6B7280'} />
        </Pressable>
      </View> */}
    </View>
  );
}
