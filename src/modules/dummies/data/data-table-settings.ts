import type { Dummy } from '@/modules/dummies/types';
import type { ColumnDef } from '@tanstack/react-table';

import { DataTableCell } from '@/core/components/data/data-table-cell';
import { DataTableCheckboxCell } from '@/core/components/data/data-table-checkbox-cell';
import { DataTableCheckboxHeader } from '@/core/components/data/data-table-checkbox-header';
import { DataTableHeader } from '@/core/components/data/data-table-header';
import { DataTableColumnType } from '@/core/constants/data-table';
import { DataTableDummyActionsCell } from '@/modules/dummies/components/data/data-table-dummy-actions-cell';

export const dummiesTableColumns: ColumnDef<Dummy>[] = [
  {
    id: 'select',
    header: DataTableCheckboxHeader,
    cell: DataTableCheckboxCell,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    meta: {
      headerI18nKey: 'dummies:fields.id',
      columnType: DataTableColumnType.ID,
    },
    header: DataTableHeader,
    cell: DataTableCell,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    meta: {
      headerI18nKey: 'dummies:fields.name',
      columnType: DataTableColumnType.TEXT,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'image',
    meta: {
      headerI18nKey: 'dummies:fields.image',
      columnType: DataTableColumnType.IMAGE,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'key',
    meta: {
      headerI18nKey: 'dummies:fields.key',
      columnType: DataTableColumnType.KEY,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'website',
    meta: {
      headerI18nKey: 'dummies:fields.website',
      columnType: DataTableColumnType.URL,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'email',
    meta: {
      headerI18nKey: 'dummies:fields.email',
      columnType: DataTableColumnType.EMAIL,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'price',
    meta: {
      headerI18nKey: 'dummies:fields.price',
      columnType: DataTableColumnType.MONEY,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'status',
    meta: {
      headerI18nKey: 'dummies:fields.status',
      columnType: DataTableColumnType.STATUS,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'special',
    meta: {
      headerI18nKey: 'dummies:fields.isSpecial',
      columnType: DataTableColumnType.BOOLEAN,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'created_at',
    meta: {
      headerI18nKey: 'dummies:fields.createdAt',
      columnType: DataTableColumnType.DATETIME,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    id: 'actions',
    cell: DataTableDummyActionsCell,
    enableHiding: false,
  },
];
