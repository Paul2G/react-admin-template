import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/core/components/ui/dialog';
import { DeviceForm } from '@/modules/devices/components/forms/device-form';
import { useCreateDeviceMutation } from '@/modules/devices/hooks/mutations';

export function CreateDeviceDialogTrigger({
  children,
}: CreateDeviceDialogProps) {
  const { t } = useTranslation();
  const [open, onOpenChange] = useState(false);

  const mutation = useCreateDeviceMutation({
    onSuccess: () => onOpenChange(false),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('devices:dialogs.create.title')}</DialogTitle>
        </DialogHeader>
        <DeviceForm
          onSubmit={(data) => mutation.mutate(data)}
          onCancel={() => onOpenChange(false)}
          isLoading={mutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}

export type CreateDeviceDialogProps = {
  children: React.ReactNode;
};
