import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { SerializedHeadingNode } from '@payloadcms/richtext-lexical'
import { InViewElement } from '@/components/in-view-element'
import { cn } from '@/lib/utils'

const className = cn([
  'opacity-0 -translate-x-10 scale-95 translate-y-2 delay-50 ease-in-out transition-all duration-400',
  'data-[inview=true]:opacity-100',
  'data-[inview=true]:scale-100',
  'data-[inview=true]:translate-x-0 ',
  'data-[inview=true]:translate-y-0 ',
])
export const headingConverter: JSXConverters<SerializedHeadingNode> = {
  heading: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })

    switch (node.tag) {
      case 'h1':
        return (
          <InViewElement asChild>
            <h1 className={className}>{...children}</h1>
          </InViewElement>
        )
      case 'h2':
        return (
          <InViewElement asChild>
            <h2 className={className}>{...children}</h2>
          </InViewElement>
        )
      case 'h3':
        return (
          <InViewElement asChild>
            <h3 className={className}>{...children}</h3>
          </InViewElement>
        )
      case 'h4':
        return (
          <InViewElement asChild>
            <h4 className={className}>{...children}</h4>
          </InViewElement>
        )
      case 'h5':
        return (
          <InViewElement asChild>
            <h5 className={className}>{...children}</h5>
          </InViewElement>
        )
      case 'h6':
        return (
          <InViewElement asChild>
            <h6 className={className}>{...children}</h6>
          </InViewElement>
        )
      default:
        return (
          <InViewElement asChild>
            <h1 className={className}>{...children}</h1>
          </InViewElement>
        )
    }
  },
}
