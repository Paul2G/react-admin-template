import type { ViewMode } from '@/core/types/data-view';
import type { Dispatch, SetStateAction } from 'react';

import { SquaresFourIcon, TableIcon } from '@phosphor-icons/react';

import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/core/components/ui/toggle-group';
import { cn } from '@/core/lib/utils';

export function DataViewToggle({ viewMode, setViewMode }: DataViewToggleProps) {
  return (
    <ToggleGroup
      value={viewMode}
      type="single"
      variant="outline"
      onValueChange={(value) => {
        if (value) setViewMode(value as ViewMode);
      }}
      className="gap-0"
    >
      <ToggleGroupItem value="table" className="cursor-pointer rounded-r-none">
        <TableIcon
          className={cn('size-4.5')}
          weight={viewMode === 'table' ? 'fill' : 'regular'}
        />
      </ToggleGroupItem>
      <ToggleGroupItem value="grid" className="cursor-pointer rounded-l-none">
        <SquaresFourIcon
          className="size-4.5"
          weight={viewMode === 'grid' ? 'fill' : 'regular'}
        />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export type DataViewToggleProps = {
  viewMode: ViewMode;
  setViewMode: Dispatch<SetStateAction<ViewMode>>;
};
