import type { Dummy } from '@/modules/dummies/types';

import React, { useState } from 'react';
import { DotsThreeIcon, PencilIcon, TrashIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { DeleteConfirmationDialog } from '@/core/components/delete-confirmation-dialog';
import { Button } from '@/core/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/core/components/ui/dropdown-menu';
import { PermissionGuard } from '@/modules/auth/components/permissions-guard';
import { UpdateDummyDialog } from '@/modules/dummies/components/dialogs/update-dummy-dialog';
import { useDeleteDummyMutation } from '@/modules/dummies/hooks/mutations';
import { ApiPermissions } from '@/modules/shared/constants/permissions';

export function DummyActions({
  dummy,
  className,
  ...restOfProps
}: DataActionsProps) {
  const { t } = useTranslation();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const deleteMutation = useDeleteDummyMutation({ dummyId: dummy.id });

  return (
    <PermissionGuard
      permissions={[
        ApiPermissions.Dummies.UPDATE,
        ApiPermissions.Dummies.DELETE,
      ]}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={className}
            {...restOfProps}
          >
            <DotsThreeIcon weight="bold" className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <PermissionGuard permissions={ApiPermissions.Dummies.UPDATE}>
            <DropdownMenuItem onClick={() => setEditOpen(true)}>
              <PencilIcon />
              {t('actions.edit')}
            </DropdownMenuItem>
          </PermissionGuard>

          <PermissionGuard permissions={ApiPermissions.Dummies.DELETE}>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => setConfirmOpen(true)}
            >
              <TrashIcon />
              {t('actions.delete')}
            </DropdownMenuItem>
          </PermissionGuard>
        </DropdownMenuContent>
      </DropdownMenu>

      <UpdateDummyDialog
        dummy={dummy}
        open={editOpen}
        onOpenChange={setEditOpen}
      />

      <DeleteConfirmationDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={() => deleteMutation.mutate()}
        isPending={deleteMutation.isPending}
        name={dummy.name}
      />
    </PermissionGuard>
  );
}

export type DataActionsProps = React.ComponentProps<typeof Button> & {
  dummy: Dummy;
};
