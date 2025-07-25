'use client'
import { CMSLink as TCMSLink } from '@/payload-types'
import React from 'react'
import Link from 'next/link'
import { getCMSLinkProps } from '@/lib/utils'
import { usePathname } from 'next/navigation'

export function CMSLinkWithActiveDataAttribute({
  data,
  ...props
}: {
  data?: TCMSLink
} & Omit<React.ComponentProps<typeof Link>, 'href'>) {
  const pathname = usePathname()
  if (!data) return null
  const cmsLinkProps = getCMSLinkProps(data)
  if (!cmsLinkProps) return null
  const { href, label, newTabProps } = cmsLinkProps
  let isActive = false
  try {
    const parsedHref = new URL(href, 'http://localhost').pathname
    isActive = parsedHref !== '' && pathname === parsedHref
  } catch {
    isActive = false
  }
  return (
    <Link data-state={isActive ? 'active' : 'inactive'} {...newTabProps} href={href} {...props}>
      {label}
    </Link>
  )
}
