import type { LoginData } from '@/modules/auth/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@/core/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/core/components/ui/field';
import { Input } from '@/core/components/ui/input';
import { Spinner } from '@/core/components/ui/spinner';
import { cn } from '@/core/lib/utils';
import { loginSchema } from '@/modules/auth/schemas';
import projectConfig from '@/project.config';

export function LoginForm({
  onSubmit,
  className,
  isLoading,
  ...props
}: LoginFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const isSubmitting = form.formState.isSubmitting || isLoading;

  function handleSubmit(data: LoginData) {
    onSubmit(data);
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <img
            src={projectConfig.brand.fullLogoSrc}
            className="w-1/2 mx-auto py-4"
          />
          <CardTitle className="text-xl">
            {t('core:greetings.welcomeBack')}
          </CardTitle>
          <CardDescription>
            {t('auth:messages.enterYourCredentials')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="login-form" onSubmit={form.handleSubmit(handleSubmit)}>
            <FieldGroup className="gap-6">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="login-form-email">
                      {t('auth:fields.email')}
                    </FieldLabel>
                    <Input
                      {...field}
                      id="login-form-email"
                      aria-invalid={fieldState.invalid}
                      disabled={isSubmitting}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="login-form-password">
                      {t('auth:fields.password')}
                    </FieldLabel>
                    <Input
                      {...field}
                      id="login-form-password"
                      type="password"
                      aria-invalid={fieldState.invalid}
                      disabled={isSubmitting}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Spinner />}
                  {t('auth:actions.login')}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export type LoginFormProps = Omit<React.ComponentProps<'div'>, 'onSubmit'> & {
  isLoading?: boolean;
  onSubmit: (data: LoginData) => void;
};
