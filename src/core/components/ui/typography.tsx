import { cva } from 'class-variance-authority';

import { cn } from '@/core/lib/utils';

export const typographyElementMap = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  p: 'p',
  blockquote: 'blockquote',
  list: 'ul',
  'inline-code': 'code',
  lead: 'p',
  large: 'div',
  small: 'small',
  muted: 'p',
} as const;

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance',
      h2: 'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      p: 'leading-7 [&:not(:first-child)]:mt-6',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      list: 'my-6 ml-6 list-disc [&>li]:mt-2',
      'inline-code':
        'bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      lead: 'text-muted-foreground text-xl',
      large: 'text-lg font-semibold',
      small: 'text-sm leading-none font-medium',
      muted: 'text-muted-foreground text-sm',
    },
  },
  defaultVariants: {
    variant: 'p',
  },
});

export type TypographyVariants = keyof typeof typographyElementMap;

export type AsProp<C extends React.ElementType> = {
  as?: C;
};

export type TypographyProps<
  K extends TypographyVariants = TypographyVariants,
  C extends React.ElementType = (typeof typographyElementMap)[K],
> = AsProp<C> & {
  variant?: K;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentProps<C>, 'as' | 'children' | 'className' | 'variant'>;

export function Typography<
  K extends TypographyVariants = TypographyVariants,
  C extends React.ElementType = (typeof typographyElementMap)[K],
>({
  as,
  variant = 'p' as K,
  className,
  children,
  ...props
}: TypographyProps<K, C>) {
  const defaultElement = typographyElementMap[variant];
  const Component = (as ?? defaultElement) as React.ElementType;

  return (
    <Component
      className={cn(typographyVariants({ variant, className }))}
      {...props}
    >
      {children}
    </Component>
  );
}
