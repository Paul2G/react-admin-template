import type { PostgrestError } from '@supabase/supabase-js';

import { NotOkResponseError } from '@/core/errors';

export function supabaseErrorThrower(error: PostgrestError | null) {
  if (!error) return;

  if (error.code === 'PGRST116') {
    throw new NotOkResponseError({
      title: 'Not found',
      detail: error.message,
      code: 'NotFound',
      status: 404,
    });
  }

  throw new NotOkResponseError({
    title: error.name,
    detail: error.message,
    code: error.code || 'UnknownError',
    status: 500,
  });
}
