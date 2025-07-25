import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { InViewElement } from '@/components/in-view-element'
import { cn } from '@/lib/utils'

type CustomLinkProps = Pick<React.ComponentProps<typeof Button>, 'variant' | 'size'> &
  React.ComponentProps<typeof Link> & { animated?: boolean }

export function CustomLink({
  variant,
  animated = true,
  size,
  children,
  ...props
}: CustomLinkProps) {
  return animated ? (
    <InViewElement asChild>
      <Button
        className={cn([
          'opacity-0 transition-[translate,scale,opacity] -translate-x-8 ease-in-out scale-90 delay-50 duration-400',
          'translate-y-8 data-[inview=true]:opacity-100 data-[inview=true]:scale-100 data-[inview=true]:translate-0',
          variant === 'outline' &&
            'bg-transparent dark:bg-transparent hover:text-inherit hover:bg-secondary/10',
        ])}
        variant={variant}
        size={size}
        asChild={true}
      >
        <Link {...props}>{children}</Link>
      </Button>
    </InViewElement>
  ) : (
    <Button
      className={cn([
        variant === 'outline' &&
          'bg-transparent dark:bg-transparent hover:text-inherit hover:bg-secondary/10',
      ])}
      variant={variant}
      size={size}
      asChild={true}
    >
      <Link {...props}>{children}</Link>
    </Button>
  )
}
