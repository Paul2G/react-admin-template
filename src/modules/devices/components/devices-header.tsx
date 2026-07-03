import { PlusIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/core/components/ui/button';
import { CreateDeviceDialogTrigger } from '@/modules/devices/components/dialogs/create-device-dialog-trigger';
import { PageHeader } from '@/modules/shared/components/page-header';

export function DevicesHeader({}: DevicesHeaderProps) {
  const { t } = useTranslation();

  // TODO: Implement permission check for creating devices
  const canCreate = true;

  return (
    <PageHeader title={t('devices:name')}>
      {canCreate && (
        <CreateDeviceDialogTrigger>
          <Button>
            <PlusIcon />
            {t('actions.addNew')}
          </Button>
        </CreateDeviceDialogTrigger>
      )}
    </PageHeader>
  );
}

export type DevicesHeaderProps = {};
