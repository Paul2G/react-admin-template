import type { Device } from '@/modules/devices/types';

import { useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/core/components/ui/dialog';
import { DeviceForm } from '@/modules/devices/components/forms/device-form';
import { useUpdateDeviceMutation } from '@/modules/devices/hooks/mutations';

export function UpdateDeviceDialog({
  device,
  open,
  onOpenChange,
}: UpdateDeviceDialogProps) {
  const { t } = useTranslation();

  const mutation = useUpdateDeviceMutation({
    deviceId: device.id,
    onSuccess: () => onOpenChange(false),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('devices:dialogs.update.title')}</DialogTitle>
        </DialogHeader>
        <DeviceForm
          defaultValues={device}
          onSubmit={(data) => mutation.mutate(data)}
          onCancel={() => onOpenChange(false)}
          isLoading={mutation.isPending}
          submitLabel={t('actions.update')}
        />
      </DialogContent>
    </Dialog>
  );
}

export type UpdateDeviceDialogProps = {
  device: Device;
  open: boolean;
  onOpenChange: (v: boolean) => void;
};
