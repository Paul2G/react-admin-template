import {
  ArrowLeftIcon,
  HammerIcon,
  HouseIcon,
  TrafficConeIcon,
} from '@phosphor-icons/react';
import { Link, useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { Button } from '@/core/components/ui/button';
import projectConfig from '@/project.config';

export function UnderConstruction() {
  const { t } = useTranslation('layout');
  const router = useRouter();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      {/* Stacked icons */}
      <div className="relative mb-8 flex items-end justify-center gap-1">
        <HammerIcon
          weight="duotone"
          className="mb-1 size-8 -rotate-12 text-muted-foreground/40"
        />
        <div className="flex size-20 items-center justify-center rounded-3xl border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
          <TrafficConeIcon
            weight="duotone"
            className="size-10 text-amber-500 dark:text-amber-400"
          />
        </div>
        <HammerIcon
          weight="duotone"
          className="mb-1 size-8 rotate-12 scale-x-[-1] text-muted-foreground/40"
        />
      </div>

      {/* Label */}
      <span className="mb-3 inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-600 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-400">
        {t('underConstruction.badge')}
      </span>

      {/* Title */}
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
        {t('underConstruction.title')}
      </h1>

      {/* Detail */}
      <p className="mb-8 max-w-sm text-sm text-muted-foreground">
        {t('underConstruction.detail')}
      </p>

      {/* Action */}
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => router.history.back()}>
          <ArrowLeftIcon />
        </Button>

        <Button variant="outline" asChild>
          <Link to={projectConfig.router.defaultRoute}>
            <HouseIcon />
            {t('actions.goHome')}
          </Link>
        </Button>
      </div>
    </div>
  );
}
