import type { DeviceFormData } from '@/modules/devices/types';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { onMutationError } from '@/core/lib/mutation-toast';
import {
  createDevice,
  deleteDevice,
  updateDevice,
} from '@/modules/devices/api/query-fns';

export function useCreateDeviceMutation({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createDevice'],
    mutationFn: createDevice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
      toast.success(t('messages.wasCreated'));
      onSuccess();
    },
    onError: onMutationError(t),
  });
}

export function useUpdateDeviceMutation({
  deviceId,
  onSuccess,
}: {
  deviceId: number;
  onSuccess: () => void;
}) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateDevice'],
    mutationFn: (data: DeviceFormData) => updateDevice(deviceId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
      toast.success(t('messages.wasUpdated'));
      onSuccess();
    },
    onError: onMutationError(t),
  });
}

export function useDeleteDeviceMutation({ deviceId }: { deviceId: number }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deleteDevice'],
    mutationFn: () => deleteDevice(deviceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
      toast.success(t('messages.wasDeleted'));
    },
    onError: onMutationError(t),
  });
}
