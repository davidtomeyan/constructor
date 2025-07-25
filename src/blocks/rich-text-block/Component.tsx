import { Section, SectionContent } from '@/components/section'
import { IRichTextBlock } from '@/payload-types'
import { RichText } from '@/components/rich-text'
import { cn } from '@/lib/utils'

export function RichTextBlock ({content,slug,...block}:IRichTextBlock){
  return (
    <Section id={slug??undefined}>
      <SectionContent className="text-start">
        <RichText className={cn([
          "prose-base! max-w-full w-full",
          block.isBordered && 'border',
          block.paddingX,
          block.maxWidth,
          block.paddingY,
          block.variant,
          block.spaceY && block.spaceY !== 'auto'
            ? cn('[&_*]:p-0 [&_*]:m-0', block.spaceY)
            : undefined,
        ])} data={content} />
      </SectionContent>
    </Section>
  )
}
