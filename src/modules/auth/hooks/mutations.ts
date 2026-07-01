import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useRouter, useSearch } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { onMutationError } from '@/core/lib/mutation-toast';
import { login, logout } from '@/modules/auth/api/query-fns';
import { verifyAuthQueryOptions } from '@/modules/auth/api/query-options';
import projectConfig from '@/project.config';

export function useAuthLoginMutation() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const router = useRouter();
  const navigate = useNavigate();

  const { redirect } = useSearch({ from: '/login' });

  return useMutation({
    mutationKey: ['auth', 'login'],
    mutationFn: login,
    onSuccess: async (user) => {
      queryClient.setQueryData(verifyAuthQueryOptions.queryKey, user);
      await router.invalidate();
      await navigate({ to: redirect ?? projectConfig.router.defaultRoute });
    },
    onError: onMutationError(t),
  });
}

export function useAuthLogoutMutation() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const router = useRouter();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['auth', 'logout'],
    mutationFn: logout,
    onSuccess: async () => {
      queryClient.setQueryData(verifyAuthQueryOptions.queryKey, null);
      await router.invalidate();
      await navigate({ to: '/login' });
    },
    onError: onMutationError(t),
  });
}
