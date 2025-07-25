'use client'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { CMSLinks, CMSLink } from '@/payload-types'
import { usePathname } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { Fragment, useState } from 'react'
import { usePopover } from './popover-provider'
import { getCMSLinkProps } from '@/lib/utils'
import { LinkWithActiveAttribute } from '@/components/link-with-active-attribute'
import { RemoveScrollBar } from 'react-remove-scroll-bar'

export function MobileMenuClient({ data }: { data: CMSLinks }) {
  return (
    <div className="grid gap-4">
      {data?.map((item, index) => {
        return (
          <Fragment key={`mob-link-${index}`}>
            <CollapsibleItem link={item.link} />
            <Separator className="last:bg-transparent" />
          </Fragment>
        )
      })}
    </div>
  )
}

function CollapsibleItem({ link }: { link: CMSLink }) {
  const pathname = usePathname()
  const { setOpen: setOpenPopover } = usePopover()

  const cmsLinkProps = getCMSLinkProps(link)
  const isActive = cmsLinkProps?.href === pathname

  const [openCollapsible, setOpenCollapsible] = useState(isActive)

  const handleClose = () => {
    setOpenPopover(false)
  }
  if (!cmsLinkProps) return null
  const { isReference, showBlocksInDropdown, blocks, label, newTabProps, href } = cmsLinkProps
  if (isReference && showBlocksInDropdown && blocks.length > 0) {
    return (
      <Collapsible onOpenChange={setOpenCollapsible} open={openCollapsible}>
        <div className="flex justify-between items-center">
          <LinkWithActiveAttribute
            className="font-semibold"
            onIsActive={setOpenCollapsible}
            onNavigate={handleClose}
            href={cmsLinkProps.href}
            {...newTabProps}
          >
            {label}
          </LinkWithActiveAttribute>
          <CollapsibleTrigger className="group">
            <ChevronRight className="group-data-[state=open]:rotate-90 transition-transform text-muted-foreground" />
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <ul className="grid gap-3 ps-2 pt-4">
            {blocks?.map((block, index) => {
              return (
                <li
                  key={`sub-link-${index}`}
                  className="row-span-3 font-semibold text-muted-foreground"
                >
                  <Link onNavigate={handleClose} href={`${href}#${block.slug}`}>
                    {block.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    )
  }
  return (
    <LinkWithActiveAttribute
      className="font-semibold"
      onNavigate={handleClose}
      href={href}
      {...newTabProps}
    >
      {label}
    </LinkWithActiveAttribute>
  )
}

export function HideScrollBody() {
  const open = usePopover()
  return open ? <RemoveScrollBar/> : null

}