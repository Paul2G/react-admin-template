import type { Dummy } from '@/modules/dummies/types';

import {
  CalendarIcon,
  EnvelopeIcon,
  GlobeIcon,
  HashIcon,
  KeyIcon,
  StarIcon,
} from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { StatusBadge } from '@/core/components/status-badge';
import { Badge } from '@/core/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/core/components/ui/card';
import { Separator } from '@/core/components/ui/separator';
import { formatDate } from '@/core/lib/dates';
import { cn, formatPrice, formatUrl } from '@/core/lib/utils';
import { DummyActions } from '@/modules/dummies/components/dummy-actions';
import { DetailFieldItem } from '@/modules/shared/components/detail-field-item';

export function DummyCard({ dummy, className }: DummyCardProps) {
  const { t } = useTranslation();

  return (
    <Card
      className={cn(
        'group relative flex flex-col gap-0 overflow-hidden border transition-shadow duration-200 hover:shadow-md',
        className,
      )}
    >
      {/* Image */}
      <div className="relative h-36 w-full overflow-hidden bg-muted">
        <img
          src={dummy.image}
          alt={dummy.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Special badge overlay */}
        {dummy.special && (
          <div className="absolute left-2 top-2">
            <Badge className="gap-1 bg-amber-500 text-white hover:bg-amber-500">
              <StarIcon size={10} weight="fill" />
              {t('dummies:fields.special')}
            </Badge>
          </div>
        )}
        {/* Status badge overlay */}
        <div className="absolute right-2 top-2">
          <StatusBadge status={dummy.status} />
        </div>
      </div>

      <CardHeader className="pb-2 pt-4">
        {/* Name + key + price */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate font-semibold leading-tight tracking-tight">
              {dummy.name}
            </p>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <KeyIcon size={10} weight="duotone" />
              {dummy.key}
            </p>
          </div>
          <span className="shrink-0 text-base font-bold tabular-nums text-foreground">
            {formatPrice(dummy.price)}
          </span>
        </div>

        {/* Description */}
        {dummy.description && (
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {dummy.description}
          </p>
        )}
      </CardHeader>

      <CardContent className="flex flex-col gap-2 pb-4">
        <Separator />
        <DetailFieldItem
          icon={HashIcon}
          label={t('dummies:fields.count')}
          value={dummy.count.toLocaleString()}
        />
        <DetailFieldItem
          icon={CalendarIcon}
          label={t('dummies:fields.createdAt')}
          value={formatDate(dummy.created_at)}
        />
        <DetailFieldItem
          icon={EnvelopeIcon}
          label={t('dummies:fields.email')}
          value={dummy.email}
        />
        <DetailFieldItem
          icon={GlobeIcon}
          label={t('dummies:fields.website')}
          value={
            <a href={dummy.website} target="_blank" rel="noreferrer">
              <span className="truncate">{formatUrl(dummy.website)}</span>
            </a>
          }
        />
        <CardFooter>
          <DummyActions
            dummy={dummy}
            variant="outline"
            className="absolute bottom-2 right-4"
          />
        </CardFooter>
      </CardContent>
    </Card>
  );
}

export type DummyCardProps = {
  dummy: Dummy;
  onEdit?: (dummy: Dummy) => void;
  onDelete?: (dummy: Dummy) => void;
  className?: string;
};
