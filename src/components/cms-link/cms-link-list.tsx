import { CMSLink } from '@/components/cms-link/index'
import type { CMSLinks } from '@/payload-types'
import { cn } from '@/lib/utils'

export function CmsLinkList({
  links,
  className,
  animated = true,
  size = "lg",
  linkClassName,
  ...props
}: {
  links?: CMSLinks,
  animated?:boolean,
  size?: 'default' | 'sm' | 'lg' | 'icon' | null | undefined
} & React.ComponentProps<'div'> & { linkClassName?: string }) {
  if (!links?.length) return null
  return (
    <div className={cn(['flex gap-3 justify-center', className])} {...props}>
      {links.map((link) => (
        <CMSLink
          animated={animated}
          size={size}
          className={cn(['pointer-events-auto grow max-w-md', linkClassName])}
          data={link.link}
          key={link.id}
        />
      ))}
    </div>
  )
}
