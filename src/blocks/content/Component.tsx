import { ContentBlock as TContentBlock } from '@/payload-types'
import { cn } from '@/lib/utils'
import { Section, SectionContent } from '@/components/section'
import { Fragment } from 'react'
import { Logos } from '@/blocks/logos/Component'
import { CmsLinkList } from '@/components/cms-link/cms-link-list'
import { GridItems } from '@/blocks/grid-block/Component'
import { RicheTextContent } from '@/blocks/rich-text-content/Component'
import { ReviewsBlock } from '@/blocks/reviews/Component'
import { AccordionBlock } from '@/blocks/accordion/Component'
import { ScrollCardsBlock } from '@/blocks/scroll-cards-block/Component'
import { FlexBlock } from '@/blocks/flex-block/Component'
import { MediaBlock } from '@/blocks/media-block/Component'
import { TabsBlock } from '@/blocks/tabs/Component'
import { FormBlock } from '@/blocks/form/Component'

export default function ContentBlock({
  slug,
  blocks,
  gapY,
  backgroundVariant,
  contentHeight,
}: TContentBlock) {
  return (
    <Section id={slug??undefined} className={cn(['relative'])}>
      <SectionContent className={cn(['z-30 justify-center', backgroundVariant, contentHeight])}>
        <div
          className={cn([
            'flex min-w-0 flex-col justify-center items-center grow z-20 text-center lg:text-start',
            gapY,
          ])}
        >
          {blocks?.map((block) => {
            return (
              <Fragment key={block.id}>
                {block.blockType === 'rich-text-content' && (
                  <RicheTextContent className={'rounded-lg w-full'} block={block} />
                )}
                {block.blockType === 'logos-block' && <Logos data={block.logos} />}
                {block.blockType === 'links-block' && (
                  <CmsLinkList links={block.links} className="w-full max-w-2xl mx-auto" />
                )}
                {block.blockType === 'grid-block' && <GridItems {...block} />}
                {block.blockType === 'reviews-block' && <ReviewsBlock {...block} />}
                {block.blockType === 'accordion' && <AccordionBlock {...block} />}
                {block.blockType === 'scroll-cards-block' && <ScrollCardsBlock {...block} />}
                {block.blockType === 'flex-block' && <FlexBlock {...block} />}
                {block.blockType === 'media-block' && <MediaBlock {...block} />}
                {block.blockType === 'tabs-block' && <TabsBlock {...block} />}
                {block.blockType === 'form-block' && <FormBlock {...block} />}
              </Fragment>
            )
          })}
        </div>
      </SectionContent>
    </Section>
  )
}
