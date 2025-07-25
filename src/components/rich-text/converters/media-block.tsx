import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { SerializedBlockNode } from '@payloadcms/richtext-lexical'
import { IRichTextMediaBlock } from '@/payload-types'
import { Media } from '@/components/Media'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { cn } from '@/lib/utils'

export const blocksJSXConverter: JSXConverters<SerializedBlockNode> = {
  blocks: {
    'media-block': ({ node }: { node: { fields: IRichTextMediaBlock } }) => {
      if (!node.fields) return null
      const { fields } = node
      return (
        <div>
          {fields.imageSize === 'aspect-ratio' ? (
            <AspectRatio
              className={cn(fields.rounded, 'relative overflow-hidden')}
              ratio={fields.ratio ?? 1}
            >
              <Media
                pictureClassName="size-full"
                htmlElement={null}
                fill
                videoClassName={'object-cover absolute size-full'}
                imgClassName={'object-cover absolute size-full'}
                resource={fields.media}
              />
            </AspectRatio>
          ) : (
            <Media resource={fields.media} />
          )}
        </div>
      )
    },
  },
}
