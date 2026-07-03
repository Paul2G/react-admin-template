import type { DeviceFormData } from '@/modules/devices/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormInput } from '@/core/components/form-fields/form-input';
import { FormSwitch } from '@/core/components/form-fields/form-switch';
import { Button } from '@/core/components/ui/button';
import { FieldGroup } from '@/core/components/ui/field';
import { Spinner } from '@/core/components/ui/spinner';
import { deviceFormSchema } from '@/modules/devices/schemas';

export function DeviceForm({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
  submitLabel,
}: DeviceFormProps) {
  const { t } = useTranslation();

  const form = useForm<DeviceFormData>({
    resolver: zodResolver(deviceFormSchema),
    defaultValues: {
      name: '',
      brand: '',
      chip: '',
      os: '',
      ports: '',
      available: true,
      ...defaultValues,
    },
  });

  const isSubmitting = form.formState.isSubmitting || isLoading;

  return (
    <form id="device-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4">
        <FormInput
          control={form.control}
          name="name"
          label={t('devices:fields.name')}
          disabled={isSubmitting}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            control={form.control}
            name="brand"
            label={t('devices:fields.brand')}
            disabled={isSubmitting}
          />
          <FormInput
            control={form.control}
            name="chip"
            label={t('devices:fields.chip')}
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            control={form.control}
            name="os"
            label={t('devices:fields.os')}
            disabled={isSubmitting}
          />
          <FormInput
            control={form.control}
            name="ports"
            label={t('devices:fields.ports')}
            disabled={isSubmitting}
          />
        </div>

        <FormSwitch
          control={form.control}
          name="available"
          label={t('devices:fields.available')}
          disabled={isSubmitting}
        />

        <div className="flex justify-end gap-2 pt-2">
          {onCancel && (
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              {t('actions.cancel')}
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Spinner />}
            {submitLabel ?? t('actions.save')}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}

export type DeviceFormProps = {
  defaultValues?: Partial<DeviceFormData>;
  onSubmit: (data: DeviceFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  submitLabel?: string;
};
