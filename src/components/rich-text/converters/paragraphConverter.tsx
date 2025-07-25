import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { SerializedParagraphNode } from '@payloadcms/richtext-lexical'
import { InViewElement } from '@/components/in-view-element'
import { cn } from '@/lib/utils'

const className = cn([
  'opacity-0 translate-x-8 translate-y-4 scale-95 delay-100 ease-in-out transition-all  duration-400',
  'data-[inview=true]:opacity-100',
  'data-[inview=true]:scale-100',
  'data-[inview=true]:translate-x-0 ',
  'data-[inview=true]:translate-y-0 ',
])

export const paragraphConverter: JSXConverters<SerializedParagraphNode> = {
  paragraph: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })
    if (!children?.length) {
      return (
        <p>
          <br />
        </p>
      )
    }
    return (
      <InViewElement asChild>
        <p className={className}>{...children}</p>
      </InViewElement>
    )
  },
}
