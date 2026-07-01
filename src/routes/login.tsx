import { InfoIcon } from '@phosphor-icons/react';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { z } from 'zod';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/core/components/ui/alert';
import { createRouteHead } from '@/layout/lib/create-route-head';
import { LoginForm } from '@/modules/auth/components/forms/login-form';
import { useAuthLoginMutation } from '@/modules/auth/hooks/mutations';
import projectConfig from '@/project.config';

export const Route = createFileRoute('/login')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: async ({ context: { auth }, search }) => {
    if (auth.isAuthenticated) {
      throw redirect({
        to: search.redirect || projectConfig.router.defaultRoute,
      });
    }
  },
  head: createRouteHead({
    type: 'generic',
    titleI18nKey: 'auth:actions.login',
  }),
  component: LoginComponent,
});

function LoginComponent() {
  const loginMutation = useAuthLoginMutation();

  return (
    <main className="bg-muted h-[100dvh] w-screen flex flex-col justify-center items-center">
      <Alert className="max-w-[24rem] mb-3 bg-blue-950/50 border-blue-500 text-blue-100 animate-in fade-in duration-1000">
        <InfoIcon />
        <AlertTitle>Example credentials:</AlertTitle>
        <AlertDescription>
          <b>User:</b> admin@example.com <br />
          <b>Password:</b> adminadmin
        </AlertDescription>
      </Alert>
      <LoginForm
        className="w-full max-w-[24rem] animate-in fade-in slide-in-from-top-5 duration-500"
        onSubmit={(data) => loginMutation.mutate(data)}
        isLoading={loginMutation.isPending}
      />
    </main>
  );
}
