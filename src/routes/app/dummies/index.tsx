import type { DummiesSearchParams, Dummy } from '@/modules/dummies/types';

import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { DataView } from '@/core/components/data/data-view';
import { NotOkResponseError } from '@/core/errors';
import { createRouteHead } from '@/layout/lib/create-route-head';
import { dummiesIndexQueryOptions } from '@/modules/dummies/api/query-options';
import { DummiesHeader } from '@/modules/dummies/components/dummies-header';
import { dummiesTableColumns } from '@/modules/dummies/data/data-table-settings';
import { DummyCard } from '@/modules/dummies/dummy-card';
import { dummiesSearchSchema } from '@/modules/dummies/schemas';
import { ApiPermissions } from '@/modules/shared/constants/permissions';

export const Route = createFileRoute('/app/dummies/')({
  validateSearch: dummiesSearchSchema,
  beforeLoad: ({ context: { auth } }) => {
    // Just an example, maybe your query functions should throw a 403
    if (!auth.hasPermissions(ApiPermissions.Dummies.READ)) {
      throw new NotOkResponseError({
        detail: 'You dont belong here',
        title: 'Forbidden',
        status: 403,
      });
    }
  },
  loaderDeps: ({ search }): DummiesSearchParams => search,
  loader: async ({ context: { queryClient }, deps }) =>
    queryClient.ensureQueryData(dummiesIndexQueryOptions(deps)),
  head: createRouteHead({
    type: 'index',
    titleI18nKey: 'dummies:name',
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  const { data } = useSuspenseQuery(dummiesIndexQueryOptions(search));

  const [selectedItems, setSelectedItems] = useState<Dummy[]>([]);

  return (
    <div className="min-h-full flex flex-col gap-4">
      <DummiesHeader selectedItems={selectedItems} />
      <DataView
        preferencesNamespace="dummies"
        items={data.items}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        pagination={data.meta}
        dataTableColumnsSettings={dummiesTableColumns}
        className="grow"
        dataGridCardSlot={(dummy) => <DummyCard dummy={dummy} key={dummy.id} />}
      />
    </div>
  );
}
