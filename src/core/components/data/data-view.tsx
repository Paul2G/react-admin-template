import type { PaginationData } from '@/core/types/response';
import type { ColumnDef, Row, VisibilityState } from '@tanstack/react-table';
import type { Dispatch, SetStateAction } from 'react';

import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { DataPaginator } from '@/core/components/data/data-paginator';
import { DataTable } from '@/core/components/data/data-table';
import { DataTableColumnSelector } from '@/core/components/data/data-table-column-selector';
import { DataViewToggle } from '@/core/components/data/data-view-toggle';
import { Typography } from '@/core/components/ui/typography';
import { useUpdateEffect } from '@/core/hooks/use-update-effect';
import {
  getColumnsPreference,
  getViewModePreference,
  setColumnsPreference,
  setViewModePreference,
} from '@/core/lib/data-view';
import { cn } from '@/core/lib/utils';

export function DataView<TData>({
  preferencesNamespace,
  items = [],
  selectedItems,
  setSelectedItems,
  pagination,
  dataFiltersSlot = null,
  dataTableColumnsSettings,
  dataTableDefaultVisibleColumns = {},
  dataTableGetRowId,
  dataTableGetRowCanSelect,
  dataGridCardSlot,
  className,
  dataGridClassName,
  ...restOfProps
}: DataViewProps<TData>) {
  const { t } = useTranslation();

  const [viewMode, setViewMode] = useState(() =>
    dataGridCardSlot ? getViewModePreference(preferencesNamespace) : 'table',
  );
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    () =>
      getColumnsPreference(
        preferencesNamespace,
        dataTableDefaultVisibleColumns,
      ),
  );

  useUpdateEffect(() => {
    setColumnsPreference(preferencesNamespace, columnVisibility);
  }, [columnVisibility]);
  useUpdateEffect(() => {
    setViewModePreference(preferencesNamespace, viewMode);
  }, [viewMode]);

  return (
    <div
      className={cn('max-sm:mb-8 grow relative flex flex-col gap-4', className)}
      {...restOfProps}
    >
      <div className="flex justify-between gap-2">
        <div className="grow flex gap-2">{dataFiltersSlot}</div>
        <div className="flex gap-2">
          {viewMode === 'table' && (
            <DataTableColumnSelector
              columns={dataTableColumnsSettings}
              visibilityState={columnVisibility}
              setVisibilityState={setColumnVisibility}
            />
          )}
          {dataGridCardSlot && (
            <DataViewToggle viewMode={viewMode} setViewMode={setViewMode} />
          )}
        </div>
      </div>
      {viewMode === 'table' && (
        <DataTable
          data={items}
          columns={dataTableColumnsSettings}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
          getRowId={dataTableGetRowId}
          getRowCanSelect={dataTableGetRowCanSelect}
          className="animate-in fade-in duration-300"
        />
      )}
      {dataGridCardSlot && viewMode === 'grid' && (
        <div
          className={cn(
            'grid gap-2 grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]',
            'animate-in fade-in duration-300',
            dataGridClassName,
          )}
        >
          {items.length ? (
            items.map(dataGridCardSlot)
          ) : (
            <div className="flex flex-col items-center gap-2 py-16">
              <MagnifyingGlassIcon
                className="text-muted-foreground size-20"
                weight="thin"
              />
              <Typography variant="lead" className="text-center">
                {t('core:messages.noResultsFound')}
              </Typography>
              <Typography variant="muted" className="text-center">
                {t('core:messages.tryRemovingFilters')}
              </Typography>
            </div>
          )}
        </div>
      )}
      <DataPaginator
        className="max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:py-2 mt-auto bg-background"
        currentPage={pagination.currentPage}
        pageSize={pagination.pageSize}
        totalItems={pagination.totalItems}
      />
    </div>
  );
}

export type DataViewProps<TData> = {
  // Persistence related
  preferencesNamespace: string;
  // data related
  items: TData[];
  dataFiltersSlot?: React.ReactNode;
  pagination: PaginationData;
  selectedItems?: TData[];
  setSelectedItems?: Dispatch<SetStateAction<TData[]>>;
  // For table
  dataTableColumnsSettings: ColumnDef<TData>[];
  dataTableDefaultVisibleColumns?: VisibilityState;
  dataTableGetRowId?: (row: TData, idx: number) => string;
  dataTableGetRowCanSelect?: (row: Row<TData>) => boolean;
  // For Grid
  dataGridCardSlot?: (item: TData) => React.JSX.Element;
  dataGridClassName?: string;
} & React.ComponentProps<'div'>;
