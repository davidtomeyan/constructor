import { CMSLink as TCMSLink } from '@/payload-types'
import { CustomLink } from '@/components/custom-link'
import React from 'react'
import Link from 'next/link'
import { getCMSLinkProps } from '@/lib/utils'

export function CMSLink({
  data,
  animated=true,
  ...props
}: {
  data?: TCMSLink;
  animated?: boolean;
} & Omit<React.ComponentProps<typeof CustomLink>, 'href'>) {
  if (!data) return null

  const cmsLinkProps = getCMSLinkProps(data)
  if (!cmsLinkProps)return null
  const {href,label,newTabProps,variant} = cmsLinkProps

  return (
    <CustomLink {...newTabProps} animated={animated} href={href} {...props} variant={variant}>
      {label}
    </CustomLink>
  )
}

export function CMSLinkSimple({
  data,
  ...props
}: {
  data?: TCMSLink
} & Omit<React.ComponentProps<typeof Link>, 'href'>) {

  if (!data) return null

  const cmsLinkProps = getCMSLinkProps(data)
  if (!cmsLinkProps)return null
  const {href,label,newTabProps} = cmsLinkProps
  return (
    <Link {...newTabProps} href={href} {...props}>
      {label}
    </Link>
  )
}

