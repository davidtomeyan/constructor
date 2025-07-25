import { CMSLink as TCMSLink } from '@/payload-types'

export const getCMSLinkProps = (data: TCMSLink) => {
  const { type, label, newTab, reference, url, variant, showBlocksInDropdown } = data
  const blocks: { label: string; slug: string }[] = []
  let href

  if (type === 'reference' && typeof reference?.value === 'object') {
    switch (reference?.relationTo) {
      case 'pages': {
        href = reference.value.slug == 'home' ? '/' : `/${reference.value.slug}`
        reference.value.layout?.blocks?.forEach((block) => {
          if (!('label' in block && block.label) || !('slug' in block && block.slug)) return
          blocks.push({ label: block.label, slug: block.slug })
        })
        break
      }
      case 'posts': {
        href = `/${reference?.relationTo}/post/${reference?.value.id}`
        break
      }
      default: {
        href = null
      }
    }
  }

  if (type !== 'reference') {
    href = url
  }

  if (!href) return null
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}
  return {
    href,
    showBlocksInDropdown,
    newTabProps,
    isReference: type === 'reference',
    label,
    variant,
    blocks,
  }
}
