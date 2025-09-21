import { ChevronsUpDown, Grid3X3, List } from 'lucide-react-native';
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
import { ToggleGroup, ToggleGroupIcon, ToggleGroupItem } from '../ui/toggle-group';
import { View } from 'react-native';

interface DocumentsHeaderProps {
  sortBy: 'recent' | 'name' | 'version';
  onSortChange: (sort: 'recent' | 'name' | 'version') => void;
  viewMode: 'list' | 'grid';
  onViewModeChange: (mode: 'list' | 'grid') => void;
}

const sortOptions = [
  { value: 'recent', label: 'Most recent' },
  { value: 'name', label: 'By name (A-Z)' },
  { value: 'version', label: 'By version (desc)' },
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

  const handleViewModeChange = (newMode: string | undefined) => {
    if (newMode === 'list' || newMode === 'grid') {
      onViewModeChange(newMode);
    }
  };

  return (
    <View className="flex-row items-center justify-between px-4 pb-4 pt-6">
      <Select value={selectedOption} onValueChange={handleValueChange} key={`select-${sortBy}`}>
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

      <ToggleGroup
        value={viewMode}
        onValueChange={handleViewModeChange}
        variant="outline"
        type="single">
        <ToggleGroupItem
          isFirst
          value="list"
          aria-label="List view"
          className={viewMode === 'list' ? 'bg-white' : 'bg-gray-100'}>
          <ToggleGroupIcon
            as={List}
            className={viewMode === 'list' ? 'text-blue-500' : 'text-gray-600'}
          />
        </ToggleGroupItem>
        <ToggleGroupItem
          isLast
          value="grid"
          aria-label="Grid view"
          className={viewMode === 'grid' ? 'bg-white' : 'bg-gray-100'}>
          <ToggleGroupIcon
            as={Grid3X3}
            className={viewMode === 'grid' ? 'text-blue-500' : 'text-gray-600'}
          />
        </ToggleGroupItem>
      </ToggleGroup>
    </View>
  );
}
