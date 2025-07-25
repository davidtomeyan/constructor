import { cn } from '@/lib/utils'
import { RichText } from '@/components/rich-text'
import { IRichTextContent } from '@/payload-types'
import { hasText } from '@payloadcms/richtext-lexical/shared'

export function RicheTextContent({
  block,
  className,
}: {
  block: IRichTextContent
} & Omit<React.ComponentProps<typeof RichText>, 'data' | 'variant'>) {
  if (!block.content || !hasText(block.content)) return null

  return (
    <RichText
      className={cn([
        className,
        block.isBordered && 'border',
        block.paddingX,
        block.maxWidth,
        block.paddingY,
        block.variant,
        block.spaceY && block.spaceY !== 'auto'
          ? cn('[&_*]:p-0 [&_*]:m-0', block.spaceY)
          : undefined,
      ])}
      data={block.content}
    />
  )
}
