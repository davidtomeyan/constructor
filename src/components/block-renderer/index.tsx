import type { Page } from '@/payload-types'
import HeroBlock from '@/blocks/hero/Component'
import ContentBlock from '@/blocks/content/Component'
import HorizontalHeroBlock from '@/blocks/horizontal-hero/Component'
import { MediaBlock } from '@/blocks/media-block/Component'
import { Section, SectionContent } from '@/components/section'
import { RichTextBlock } from '@/blocks/rich-text-block/Component'

export default function BlockRenderer(props: Page['layout']) {
  if (!props?.blocks) return null
  return props?.blocks.map((block, index) => {
    const key = `block-${index}`
    switch (block.blockType) {
      case 'hero': {
        return <HeroBlock key={key} {...block} />
      }
      case 'content': {
        return <ContentBlock key={key} {...block} />
      }
      case 'horizontal-hero': {
        return <HorizontalHeroBlock key={key} {...block} />
      }
      case 'media-block': {
        return (
          <Section key={key}>
            <SectionContent id={block.slug ?? undefined}>
              <MediaBlock {...block} />
            </SectionContent>
          </Section>
        )
      }
      case 'rich-text-block': {
        return <RichTextBlock key={key} {...block} />
      }
      default:
        return null
    }
  })
}
