import type { DummiesSearchParams } from '@/modules/dummies/types';

import { queryOptions } from '@tanstack/react-query';

import { getDummiesList, getDummyById } from '@/modules/dummies/api/query-fns';

export const dummiesIndexQueryOptions = (params: DummiesSearchParams) =>
  queryOptions({
    queryKey: ['dummies', params],
    queryFn: () => getDummiesList(params),
  });

export const dummyQueryOptions = (itemId: number) =>
  queryOptions({
    queryKey: ['dummies', itemId],
    queryFn: () => getDummyById(itemId),
  });
