import { cn } from '@/lib/utils'

export function Width({
  width,
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & { width?: string | number | null }) {
  return (
    <div
      {...props}
      className={cn(['w-full inline-block px-1.5', className])}
      style={{ maxWidth: width ? `${width}%` : undefined }}
    >
      {children}
    </div>
  )
}
