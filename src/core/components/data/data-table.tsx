import type {
  ColumnDef,
  OnChangeFn,
  Row,
  RowSelectionState,
  VisibilityState,
} from '@tanstack/react-table';
import type { ComponentProps, Dispatch, SetStateAction } from 'react';

import { useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/core/components/ui/table';
import { Typography } from '@/core/components/ui/typography';
import { cn } from '@/core/lib/utils';

export function DataTable<TData>({
  data,
  columns,
  columnVisibility,
  setColumnVisibility,
  // @ts-expect-error - idx is only used as fallback, so it will never be used if row has no id
  getRowId = (row, idx) => String(row?.id ?? idx),
  getRowCanSelect,
  selectedItems,
  setSelectedItems,
  className,
  ...restOfProps
}: DataTableProps<TData>) {
  const { t } = useTranslation();

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    enableRowSelection:
      getRowCanSelect ?? Boolean(selectedItems && setSelectedItems),
    getRowId,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      columnVisibility,
      rowSelection,
    },
  });

  const selectedIds = new Set(
    Object.keys(rowSelection).filter((id) => rowSelection[id]),
  );

  useEffect(() => {
    if (!selectedItems || !setSelectedItems) return;

    setSelectedItems((prev) => {
      // 1. Remove deselected items using getRowId to resolve each item's ID
      const stillSelected = prev.filter((item) => {
        const id = getRowId(item, -1); // index irrelevant for ID-based lookup
        return selectedIds.has(id);
      });

      // 2. Add newly selected items from the current page
      const prevIds = new Set(
        stillSelected.map((item, idx) => getRowId(item, idx)),
      );
      const newlySelected = table
        .getRowModel()
        .rows.filter((row) => rowSelection[row.id] && !prevIds.has(row.id))
        // row.id is already resolved by the table using your getRowId
        .map((row) => row.original);

      return [...stillSelected, ...newlySelected];
    });
  }, [rowSelection]);

  return (
    <div
      className={cn('overflow-hidden rounded-md border', className)}
      {...restOfProps}
    >
      <Table>
        <TableHeader className="bg-muted sticky top-0">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length}>
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
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export type DataTableProps<TData> = {
  data: TData[];
  // Columns
  columns: ColumnDef<TData>[];
  columnVisibility: VisibilityState;
  setColumnVisibility: OnChangeFn<VisibilityState>;
  // Rows
  getRowId?: (row: TData, idx: number) => string;
  getRowCanSelect?: (row: Row<TData>) => boolean;
  // Selected items
  selectedItems?: TData[];
  setSelectedItems?: Dispatch<SetStateAction<TData[]>>;
} & ComponentProps<'div'>;
