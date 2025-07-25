import { IFooterLinks } from '@/payload-types'
import { CMSLink } from '@/components/cms-link'

export function LinksBlock({ links }: IFooterLinks) {
  if (!links?.length) return null

  return (
    <div className="flex flex-1 gap-1 flex-wrap items-center justify-center">
      {links.map((i, index) => {
        return (
          <CMSLink size={"sm"} data={i.link} key={`footer-link-${index}`} />
        )
      })}
    </div>
  )
}
