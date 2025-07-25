import { Block } from 'payload'
import { slug } from '@/fields/slug'
import { LogosBlock } from '@/blocks/logos/config'
import { links } from '@/fields/links'
import { GridBlock } from '@/blocks/grid-block/config'
import { getBackgroundVariants } from '@/fields/background-variants'
import { getRichTextContent } from '@/blocks/rich-text-content/config'
import { getContentHeightField } from '@/fields/content-height'
import { getGapYField } from '@/fields/gap'
import { ReviewsBlock } from '@/blocks/reviews/config'
import { AccordionBlock } from '@/blocks/accordion/config'
import { ScrollCardsBlock } from '@/blocks/scroll-cards-block/config'
import { FlexBlock } from '@/blocks/flex-block/config'
import { MediaBlock } from '@/blocks/media-block/config'
import { TabsBlock } from '@/blocks/tabs/clonfig'
import { FormBlock } from '@/blocks/form/config'

export const ContentBlock: Block = {
  slug: 'content',
  labels: {
    plural: 'Contents',
    singular: 'Content',
  },
  interfaceName: 'ContentBlock',
  fields: [
    {
      type: 'row',
      fields: [
        {
          type: 'text',
          name: 'label',
          label: 'Label',
          admin: {
            description: 'The name shown in navigation links that point to this block.',
          },
        },
        {
          ...slug('label', 'block', false),
        },
      ],
    },
    {
      type: 'row',
      fields: [
        getContentHeightField({
          admin: {
            width: '50%',
          },
        }),
        getBackgroundVariants({
          admin: {
            width: '50%',
          },
        }),
        getGapYField({
          admin: {
            width: '50%',
          },
        }),
      ],
    },
    {
      admin: {
        initCollapsed: false,
      },
      name: 'blocks',
      type: 'blocks',
      blocks: [
        getRichTextContent(),
        {
          slug: 'links-block',
          fields: [links],
        },
        GridBlock,
        LogosBlock,
        ReviewsBlock,
        AccordionBlock,
        ScrollCardsBlock,
        FlexBlock,
        MediaBlock,
        TabsBlock,
        FormBlock,
      ],
    },
  ],
}
