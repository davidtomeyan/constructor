import { SerializedAutoLinkNode, SerializedLinkNode } from '@payloadcms/richtext-lexical'
import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'

export const linkJSXConverter: (args: {
  internalDocToHref?: (args: { linkNode: SerializedLinkNode }) => string
}) => JSXConverters<SerializedAutoLinkNode | SerializedLinkNode> = ({ internalDocToHref }) => ({
  autolink: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({
      nodes: node.children,
    })

    const rel: string | undefined = node.fields.newTab ? 'noopener noreferrer' : undefined
    const target: string | undefined = node.fields.newTab ? '_blank' : undefined
    if (!node.fields.url) return null
    return (
      <Link  href={node.fields.url} {...{ rel, target }}>
        {children}
      </Link>
    )
  },
  link: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({
      nodes: node.children,
    })

    const rel: string | undefined = node.fields.newTab ? 'noopener noreferrer' : undefined
    const target: string | undefined = node.fields.newTab ? '_blank' : undefined

    let href: string = node.fields.url ?? ''
    if (node.fields.linkType === 'internal') {
      if (internalDocToHref) {
        href = internalDocToHref({ linkNode: node })
      } else {
        console.error(
          'Lexical => JSX converter: Link converter: found internal link, but internalDocToHref is not provided',
        )
        href = '#' // fallback
      }
    }

    return (
      <Link href={href} {...{ rel, target }}>
        {children}
      </Link>
    )
  },
})


export const safeLinkJSXConverter = (): JSXConverters<SerializedAutoLinkNode | SerializedLinkNode> => ({
  autolink: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })
    const rel = node.fields.newTab ? 'noopener noreferrer' : undefined
    const target = node.fields.newTab ? '_blank' : undefined
    const href = node.fields.url ?? '#'

    return (
      <Link href={href} rel={rel} target={target}>
        {children}
      </Link>
    )
  },
  link: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })
    const rel = node.fields.newTab ? 'noopener noreferrer' : undefined
    const target = node.fields.newTab ? '_blank' : undefined

    let href = node.fields.url ?? '#'

    if (node.fields.linkType === 'internal') {
      const doc = node.fields.doc
      if (doc && typeof doc.value === 'object' && 'slug' in doc.value) {
        const slug = doc.value.slug
        href = doc.relationTo === 'posts' ? `/posts/${slug}` : slug === 'home' ? '/' : `/${slug}`
      }
    }

    return (
      <Link href={href} rel={rel} target={target}>
        {children}
      </Link>
    )
  },
})