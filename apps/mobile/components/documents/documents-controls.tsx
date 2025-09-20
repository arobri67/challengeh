import {
  Bold,
  ChevronDown,
  ChevronsUpDown,
  Grid3X3,
  Italic,
  List,
  Underline,
} from 'lucide-react-native';
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
import { useState } from 'react';

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

  const handleViewModeChange = (newMode: string | undefined) => {
    if (newMode === 'list' || newMode === 'grid') {
      onViewModeChange(newMode);
    }
  };

  return (
    <View className="flex-row items-center justify-between px-4 pb-4 pt-6">
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

      <ToggleGroup
        value={viewMode}
        onValueChange={handleViewModeChange}
        variant="outline"
        type="single">
        <ToggleGroupItem isFirst value="list" aria-label="List view">
          <ToggleGroupIcon as={List} />
        </ToggleGroupItem>
        <ToggleGroupItem isLast value="grid" aria-label="Grid view">
          <ToggleGroupIcon as={Grid3X3} />
        </ToggleGroupItem>
      </ToggleGroup>

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
