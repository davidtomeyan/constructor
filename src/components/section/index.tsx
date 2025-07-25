import { cn } from '@/lib/utils'

export function Section({ children, className, ...props }: React.ComponentProps<'section'>) {
  return (
    <section
      className={cn([
        "flex h-auto min-w-0 w-full justify-center items-center",
        'first:pt-(--header-height) scroll-mt-(--header-height)',
        className,
      ])}
      {...props}
    >
      {children}
    </section>
  )
}

export function SectionContent({ className, children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn([
        'flex flex-1 justify-center items-center px-6 md:px-8 lg:px-16 xl:px-24 py-8 md:py-14 xl:py-20 max-w-9xl min-w-0',
        className,
      ])}
      {...props}
    >
      {children}
    </div>
  )
}
