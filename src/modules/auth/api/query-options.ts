import { queryOptions } from '@tanstack/react-query';

import { verifySession } from '@/modules/auth/api/query-fns';

export const verifyAuthQueryOptions = queryOptions({
  queryKey: ['users', 'me'],
  queryFn: async () => {
    try {
      return await verifySession();
    } catch {
      return null;
    }
  },
  staleTime: Infinity, // don't re-fetch unless explicitly invalidated
  retry: false,
});
